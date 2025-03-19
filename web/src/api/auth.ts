import apiClient from './client'
import { SignUpParams, SignInParams, User } from '../types/auth'
import { ApiResponse } from '../types/api'
import { encrypt } from '../utils/crypto'

const request = apiClient('/auth')

export const authApi = {
  signUp: async (params: SignUpParams) => {
    const encryptedPassword = encrypt(params.password)
    const response = await request.post<ApiResponse<User>>('/signup', {
      ...params,
      password: encryptedPassword
    })
    return response.data
  },

  signIn: async (params: SignInParams) => {
    const encryptedPassword = encrypt(params.password)
    const response = await request.post<ApiResponse<User>>('/signin', {
      ...params,
      password: encryptedPassword
    })
    return response.data
  },

  getCurrentUser: async () => {
    const response = await request.get<ApiResponse<User>>('/me')
    return response.data
  }
} 