import express from 'express'
const router = express.Router()
import {userController} from '../controllers'

router
  .route('/')
  .get(userController.getAllUser)


export default router