import { client } from './client'
import { SignUpParams, SignInParams, User } from '../types/auth'
import { ApiResponse } from '../types/api'
import { encrypt } from '../utils/crypto'

export const authApi = {
  signUp: async (params: SignUpParams) => {
    const encryptedPassword = encrypt(params.password)
    const response = await client.post<ApiResponse<User>>('/auth/signup', {
      ...params,
      password: encryptedPassword
    })
    return response.data
  },

  signIn: async (params: SignInParams) => {
    const encryptedPassword = encrypt(params.password)
    const response = await client.post<ApiResponse<User>>('/auth/signin', {
      ...params,
      password: encryptedPassword
    })
    return response.data
  },

  getCurrentUser: async () => {
    const response = await client.get<ApiResponse<User>>('/auth/me')
    return response.data
  }
} 