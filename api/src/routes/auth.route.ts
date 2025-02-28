import { Router } from 'express'
import { signIn, signUp, refreshToken } from '../controllers/auth.controller'
import { validateSignUp, validateSignIn } from '../middleware/validation.middleware'

const router = Router()

router.post('/signup', validateSignUp, signUp)
router.post('/signin', validateSignIn, signIn)
router.post('/refresh-token', refreshToken)

export default router 