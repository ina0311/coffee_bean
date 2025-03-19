export interface ApiResponse<T> {
  data: T
  message: string
}

export interface SignUpParams {
  name: string
  email: string
  password: string
}

export interface SignInParams {
  email: string
  password: string
} 