export interface SignUpParams {
  name: string
  email: string
  password: string
}

export interface SignInParams {
  email: string
  password: string
}

export interface User {
  id: number
  name: string
  email: string
  created_at: string
  updated_at: string
} 