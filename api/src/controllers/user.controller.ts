import type { Request, Response } from 'express'
import catchAsync from '../utils/catchAsync'
import { User } from '../entity/User'
import { AppDataSource } from '../database/data-source'

export const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const users = await AppDataSource.getRepository(User).find()
  res.status(200).json({ data: users, message: 'Success' })
})

export const createUser = catchAsync(async (req: Request, res: Response) => {
  const userRepository = AppDataSource.getRepository(User)
  const user = userRepository.create(req.body)
  const savedUser = await userRepository.save(user)
  res.status(201).json({ data: savedUser, message: 'User created successfully' })
})
