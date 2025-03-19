import apiClient from './client'
import { ApiResponse, Coffee } from '@coffee-bean/types'

const request = apiClient('/coffees')

export const coffeeApi = {
  // コーヒー一覧を取得
  getAll: async () => {
    const response = await request.get<ApiResponse<Coffee[]>>()
    return response.data
  },

  // 特定のコーヒーを取得
  getById: async (id: number) => {
    const response = await request.get<ApiResponse<Coffee>>(`/${id}`)
    return response.data
  },
} 