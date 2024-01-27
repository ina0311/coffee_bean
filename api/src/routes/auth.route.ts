import express from 'express'
const router = express.Router()
import {authController} from '../controllers'
import * as authValidate from '../middlewares/validations/auth.validate'

router
  .route('/signup')
  .post(authValidate.validateSignup, authController.signup)


export default router