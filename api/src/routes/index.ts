import express from 'express'
const router = express.Router()
import userRoute from './user.route'
import authRoute from './auth.route'
import profileRoute from './profile.route'

const defaultRoutes: {path: string, route: any}[] = [
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/profile',
    route: profileRoute,
  },
]

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route)
})

export default router
