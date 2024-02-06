import express from 'express'
const router = express.Router()
import {coffeeBeanController} from '../controllers'
import * as coffeeBeanValidate from '../middlewares/validations/coffeeBean.validate'

router
  .route('/register')
  .post(coffeeBeanValidate.validateCoffeeBean, coffeeBeanController.create)

export default router