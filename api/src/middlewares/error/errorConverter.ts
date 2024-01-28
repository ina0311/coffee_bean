import { Request, Response, NextFunction } from 'express'
import httpStatus from 'http-status'
import ApiError from '../../utils/apiError'

const errorConverter = (err: Error, req: Request, res: Response, next: NextFunction) => {
  let error = err
  if (!(error instanceof ApiError)) {
    const statusCode = httpStatus.INTERNAL_SERVER_ERROR
    const message = error.message || httpStatus[statusCode]
    error = new ApiError(statusCode, message, false, err.stack)
  }
  next(error)
}

export default errorConverter