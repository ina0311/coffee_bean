import type { Request, Response } from 'express'
import catchAsync from '../utils/catchAsync'
import { Models } from '../models/index'

export const signup = catchAsync(async (req: Request, res: Response) => {
  const {username, email, password} = req.body
  await Models.User.create({username, email, password})
  res.status(201).json({message: 'User created'})
})