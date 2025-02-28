import { Router } from 'express'
import userRoute from './user.route'
import coffeeRoute from './coffee.route'
import authRoute from './auth.route'

const router = Router()

router.get('/', (req, res) => {
    res.send('Hello World')
})

router.use('/auth', authRoute)
router.use('/users', userRoute)
router.use('/coffees', coffeeRoute)

export default router
