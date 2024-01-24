import express from 'express'
const router = express.Router()
import userRoute from './user.route'

const defaultRoutes: {path: string, route: any}[] = [
  {
    path: '/users',
    route: userRoute,
  },
]

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route)
})

export default router
