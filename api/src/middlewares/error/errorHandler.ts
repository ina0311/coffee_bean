import { Request, Response, NextFunction } from 'express'
import ApiError from '../../utils/apiError'

const errorHandler = (err: ApiError, _req: Request, res: Response, _next: NextFunction) => {
  const { statusCode, message } = err
  res.locals.errorMessage = err.message

  const response = {
    code: statusCode,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  }

  res.status(statusCode).send(response)
}

export default errorHandler