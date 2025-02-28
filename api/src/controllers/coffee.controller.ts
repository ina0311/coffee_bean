import type { Request, Response } from 'express'
import catchAsync from '../utils/catchAsync'
import { CoffeeRepository } from '../repositories/coffee.repository'

const coffeeRepository = new CoffeeRepository()

export const getAllCoffees = catchAsync(async (req: Request, res: Response) => {
  const coffees = await coffeeRepository.findAll()
  res.status(200).json({ data: coffees, message: 'Success' })
}) 