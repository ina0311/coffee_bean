import express from 'express'
const router = express.Router()
import userRoute from './user.route'
import authRoute from './auth.route'
import profileRoute from './profile.route'
import storeRoute from './store.route'
import coffeeBeanRoute from './coffeeBean.route'

import authenticateToken from '../middlewares/authenticate'

const defaultRoutes: {path: string, route: any, middleware?: any}[] = [
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
    middleware: authenticateToken,
  },
  {
    path: '/store',
    route: storeRoute,
    middleware: authenticateToken,
  },
  {
    path: '/coffeeBean',
    route: coffeeBeanRoute,
    middleware: authenticateToken,
  },
]

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route)
})

export default router
