import { Request, Response, NextFunction } from 'express'
import httpStatus from 'http-status'
import ApiError from './apiError'
import { LoggedRequest } from 'src/middlewares/authenticate'

type AsyncFunction = (req: Request | LoggedRequest, res: Response, next: NextFunction) => Promise<void>

const catchAsync = (fn: AsyncFunction) => (req: Request | LoggedRequest, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    if (err.message = 'Validation error') {
      // @ts-ignore
      next(new ApiError(httpStatus.BAD_REQUEST, `${err.message}: ${err.errors}`, true))
    }
    next(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err.message, false, err.stack))
  })
}

export default catchAsync;
