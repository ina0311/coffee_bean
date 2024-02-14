import express from 'express'
const router = express.Router()
import {flavorController} from '../controllers'

router
  .route('/')
  .get(flavorController.getFindAllByOmitUnnecessary)

export default router