import express from 'express'
const router = express.Router()
import {coffeeBeanController} from '../controllers'
import * as coffeeBeanValidate from '../middlewares/validations/coffeeBean.validate'

router
  .route('/')
  .get(coffeeBeanController.findAll)

router
  .route('/:id')
  .get(coffeeBeanController.findOneById)

router
  .route('/register')
  .post(coffeeBeanValidate.validateCoffeeBean, coffeeBeanController.create)

router
  .route('/:id/reviews')
  .get(coffeeBeanController.findAllReviews)
  .post(coffeeBeanController.createReview)

router
  .route('/:id/reviews/:reviewId')
  .get(coffeeBeanController.findReview)

export default router