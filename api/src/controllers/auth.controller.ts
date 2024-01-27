import type { Request, Response } from 'express'
import catchAsync from '../utils/catchAsync'
import { Models } from '../models/index'

export const signup = catchAsync(async (req: Request, res: Response) => {
  await Models.User.create(req.body)
})