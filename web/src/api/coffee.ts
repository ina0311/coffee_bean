import { client } from './client';
import { Coffee, ApiResponse } from '../types/api';

export const coffeeApi = {
  // コーヒー一覧を取得
  getAll: async () => {
    const response = await client.get<ApiResponse<Coffee[]>>('/coffees');
    return response.data;
  },

  // 特定のコーヒーを取得
  getById: async (id: number) => {
    const response = await client.get<ApiResponse<Coffee>>(`/coffees/${id}`);
    return response.data;
  },
}; 