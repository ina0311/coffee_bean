import type { Request, Response } from 'express'
import { Models } from '../models/index'
import catchAsync from '../utils/catchAsync'
import httpStatus from 'http-status'

export const getFindAllByOmitUnnecessary = catchAsync(async (req: Request, res: Response) => {
  const flavors = await Models.Flavor.scope('omit').findAll()
  res.status(httpStatus.OK).send(flavors)
})