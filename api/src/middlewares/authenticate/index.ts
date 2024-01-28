import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET!

export type LoggedRequest = Request & {userId?: number}

const authenticateToken = (req: LoggedRequest, res: Response, next: NextFunction) => {
  const token = req.headers.cookie?.split('=')[1];
  if (token == null) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, JWT_SECRET, {algorithms: ['HS256']}) as {id: number, iat: number, exp: number}
    req.userId = decoded.id
    next()
  } catch (err) {
    res.sendStatus(403)
  }
}

export default authenticateToken