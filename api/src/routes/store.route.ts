import express from 'express'
const router = express.Router()
import {storeController} from '../controllers'

router
  .route('/googleSearch')
  .get(storeController.googleSearch)

export default router