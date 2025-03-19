import { Router } from 'express'
import userRoute from './user.route'
import coffeeRoute from './coffee.route'
import authRoute from './auth.route'
import flavorRoute from './flavor.route'

const router = Router()
const apiRouter = Router()


router.use('/api/v1', apiRouter)
apiRouter.get('/', (req, res) => {
    res.send('Hello World')
})

apiRouter.use('/auth', authRoute)
apiRouter.use('/users', userRoute)
apiRouter.use('/coffees', coffeeRoute)
apiRouter.use('/flavors', flavorRoute)

export default router
