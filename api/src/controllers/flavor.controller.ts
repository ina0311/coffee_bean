import type { Request, Response } from 'express'
import catchAsync from '../utils/catchAsync'
import { FlavorRepository } from '../repositories/flavor.repository'

const flavorRepository = new FlavorRepository()

export const getAllFlavors = catchAsync(async (req: Request, res: Response) => {
  const flavors = await flavorRepository.findAll()
  res.status(200).json({ data: flavors, message: 'Success' })
})



