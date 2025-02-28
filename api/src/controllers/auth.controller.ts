import type { Request, Response } from 'express'
import jwt, { Secret } from 'jsonwebtoken'
import { AuthRepository } from '../repositories/auth.repository'
import catchAsync from '../utils/catchAsync'

const authRepository = new AuthRepository()

const generateTokens = (userId: number) => {
  const accessToken = jwt.sign(
    { userId },
    (process.env.JWT_SECRET || 'your-secret-key') as Secret,
    { expiresIn: '1h' }
  )

  const refreshToken = jwt.sign(
    { userId },
    (process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key') as Secret,
    { expiresIn: '7d' }
  )

  return { accessToken, refreshToken }
}

export const signUp = catchAsync(async (req: Request, res: Response) => {
  const { name, email, password } = req.body

  const existingAuth = await authRepository.findByEmail(email)
  if (existingAuth) {
    return res.status(400).json({
      message: 'Email already exists'
    })
  }

  const auth = await authRepository.create({ name, email, password })
  const { accessToken, refreshToken } = generateTokens(auth.user.id)

  const refreshTokenExpiresAt = new Date()
  refreshTokenExpiresAt.setDate(refreshTokenExpiresAt.getDate() + 7)

  await authRepository.updateRefreshToken(auth.id, refreshToken, refreshTokenExpiresAt)

  res.status(201).json({
    message: 'User created successfully',
    data: {
      user: {
        id: auth.user.id,
        name: auth.user.name,
        email: auth.user.email
      },
      accessToken,
      refreshToken
    }
  })
})

export const signIn = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body

  const auth = await authRepository.findByEmail(email)
  if (!auth) {
    return res.status(401).json({
      message: 'Invalid email or password'
    })
  }

  const isPasswordValid = await auth.comparePassword(password)
  if (!isPasswordValid) {
    return res.status(401).json({
      message: 'Invalid email or password'
    })
  }

  await authRepository.updateLastLogin(auth.id)

  const { accessToken, refreshToken } = generateTokens(auth.user.id)

  const refreshTokenExpiresAt = new Date()
  refreshTokenExpiresAt.setDate(refreshTokenExpiresAt.getDate() + 7)

  await authRepository.updateRefreshToken(auth.id, refreshToken, refreshTokenExpiresAt)

  res.status(200).json({
    message: 'Login successful',
    data: {
      user: {
        id: auth.user.id,
        name: auth.user.name,
        email: auth.user.email
      },
      accessToken,
      refreshToken
    }
  })
})

export const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.body

  if (!refreshToken) {
    return res.status(400).json({
      message: 'Refresh token is required'
    })
  }

  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key'
    ) as { userId: number }

    const auth = await authRepository.findByRefreshToken(refreshToken)
    if (!auth || auth.refresh_token !== refreshToken) {
      return res.status(401).json({
        message: 'Invalid refresh token'
      })
    }

    if (auth.refresh_token_expires_at && auth.refresh_token_expires_at < new Date()) {
      return res.status(401).json({
        message: 'Refresh token has expired'
      })
    }

    const { accessToken: newAccessToken, refreshToken: newRefreshToken } = generateTokens(decoded.userId)

    const refreshTokenExpiresAt = new Date()
    refreshTokenExpiresAt.setDate(refreshTokenExpiresAt.getDate() + 7)

    await authRepository.updateRefreshToken(auth.id, newRefreshToken, refreshTokenExpiresAt)

    res.status(200).json({
      message: 'Token refreshed successfully',
      data: {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
      }
    })
  } catch (error) {
    return res.status(401).json({
      message: 'Invalid refresh token'
    })
  }
}) 