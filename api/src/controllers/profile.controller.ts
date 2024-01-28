import type { Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../utils/catchAsync'
import { Models } from '../models/index'
import type { LoggedRequest } from '../middlewares/authenticate'

export const myProfile = catchAsync(async (req: LoggedRequest, res: Response) => {
  const user = await Models.User.findByPk(req.userId)
  res.status(httpStatus.OK).json(user)
})