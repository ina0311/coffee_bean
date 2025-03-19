import { User } from './User'

export interface Auth {
  id: number
  password_hash: string
  last_login_at?: Date
  refresh_token?: string
  refresh_token_expires_at?: Date
  user: User
  createdAt: Date
  updatedAt: Date
} 