import type { Request, Response } from 'express'
import catchAsync from '../utils/catchAsync'
import { textMapSearch } from '../services/googleMap'

export const googleSearch = catchAsync(async (req: Request, res: Response) => {
  const query = req.query.q?.toString() ?? ''
  const response = await textMapSearch(query)
  res.send(response.results)
})

