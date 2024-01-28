import express from 'express'
const router = express.Router()
import {profileController} from '../controllers'
import authenticateToken from '../middlewares/authenticate'

router
  .route('/')
  .get(authenticateToken, profileController.myProfile)

export default router