import express from 'express'
import router from './routes'
import cors from './utils/cors'
import httpStatus from 'http-status'
import ApiError from './utils/apiError'
import errorConverter from './middlewares/error/errorConverter'
import errorHandler from './middlewares/error/errorHandler'

const app = express()

app.use(cors)

app.use(express.json())

app.use('/api/v1', router)

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
})

app.use(errorConverter)

app.use(errorHandler)

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
