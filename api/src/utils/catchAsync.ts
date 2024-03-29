import { Request, Response, NextFunction } from 'express'
import httpStatus from 'http-status'
import ApiError from './apiError'

type AsyncFunction = (req: Request, res: Response, next: NextFunction) => Promise<void>

const catchAsync = (fn: AsyncFunction) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    if (err.message = 'Validation error') {
      // @ts-ignore
      next(new ApiError(httpStatus.BAD_REQUEST, `${err.message}: ${err.errors.map(e => e.message).join()}`, true))
    }
    next(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err.message, false, err.stack))
  })
}

export default catchAsync;
