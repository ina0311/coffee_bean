import express from 'express'
const router = express.Router()
import {coffeeBeanController} from '../controllers'
import * as coffeeBeanValidate from '../middlewares/validations/coffeeBean.validate'

router
  .route('/:id')
  .get(coffeeBeanController.findOneById)

router
  .route('/register')
  .post(coffeeBeanValidate.validateCoffeeBean, coffeeBeanController.create)

export default router