import type { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../utils/catchAsync'
import { Models } from '../models/index'

export const signup = catchAsync(async (req: Request, res: Response) => {
  const {username, email, password} = req.body
  await Models.User.create({username, email, password})
  res.status(httpStatus.CREATED).json({message: 'User created'})
})

export const signin = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const {email, password} = req.body
  const user = await Models.User.findOne({where: {email}})
  if (!user || !(user.correctPassword(password))) {
    res.status(httpStatus.UNAUTHORIZED).json({message: 'Incorrect email or password'})
    return
  }
  const token = user.generateToken()

  res.cookie('jwt', token, {
    httpOnly: false,
    secure: true,
    sameSite: 'none', // クロスオリジンでも送信(corsで対応)
    maxAge: 3600000
  })

  res.status(httpStatus.OK).json({message: 'User logged in'})
})