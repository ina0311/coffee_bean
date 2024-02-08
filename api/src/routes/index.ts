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
    path: '/stores',
    route: storeRoute,
    middleware: authenticateToken,
  },
  {
    path: '/coffeeBeans',
    route: coffeeBeanRoute,
    middleware: authenticateToken,
  },
]

defaultRoutes.forEach((route) => {
  if (route.middleware) {
    router.use(route.path, route.middleware, route.route)
    return
  }
  router.use(route.path, route.route)
})

export default router
