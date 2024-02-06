import { body, validationResult } from 'express-validator'
import type { Request, Response, NextFunction } from 'express'

export const validateCoffeeBean = [
  body('name').isString().notEmpty(),
  body('price').isInt().notEmpty(),
  body('roast').isString().notEmpty(),
  body('storePlaceId').isString().optional(),
  body('country').isObject().optional(),
  body('minAltitude').isLength({ max: 4 }).optional(),
  body('maxAltitude').isLength({ max: 4 }).optional(),
  body('process').isString().optional(),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg })
    }
    next()
  }
]