import express from 'express'
const router = express.Router()
import {profileController} from '../controllers'

router
  .route('/')
  .get(profileController.myProfile)

export default router