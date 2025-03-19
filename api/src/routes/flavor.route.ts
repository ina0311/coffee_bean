import { Router } from 'express'
import { getAllFlavors } from '../controllers/flavor.controller'

const router = Router()

router.get('/', getAllFlavors)

export default router
