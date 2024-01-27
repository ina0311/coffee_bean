import express from 'express'
const router = express.Router()
import userRoute from './user.route'
import authRoute from './auth.route'

const defaultRoutes: {path: string, route: any}[] = [
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/auth',
    route: authRoute,
  },
]

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route)
})

export default router
