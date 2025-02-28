import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { AuthRepository } from '../repositories/auth.repository'

interface JwtPayload {
  userId: number
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number
        name: string
        email: string
      }
    }
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authentication required' })
    }

    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'your-secret-key'
    ) as JwtPayload

    const authRepository = new AuthRepository()
    const auth = await authRepository.findByUserId(decoded.userId)
    if (!auth) {
      return res.status(401).json({ message: 'User not found' })
    }

    req.user = {
      id: auth.user.id,
      name: auth.user.name,
      email: auth.user.email
    }

    next()
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' })
  }
} 