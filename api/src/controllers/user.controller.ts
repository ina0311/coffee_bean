import type { Request, Response } from 'express'
import catchAsync from '../utils/catchAsync'
import { Models } from '../models/index'

export const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const users = await Models.User.findAll()
  res.status(200).json(users)
})

export const createUser = catchAsync(async (req, res) => {
  const user = await Models.User.create(req.body)
  res.status(201).json({ user })
})
