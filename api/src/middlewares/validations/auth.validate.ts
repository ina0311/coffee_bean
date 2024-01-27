import { body, validationResult } from 'express-validator'
import type { Request, Response, NextFunction } from 'express'

export const validateSignup = [
  body('email').isEmail(),
  body('username').isLength({ min: 3 }),
  body('password').isLength({ min: 8 }),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    debugger
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg })
    }
    next()
  }
]
