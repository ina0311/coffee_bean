import axios from 'axios'

const createClient = (basePath: string) => axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}${basePath}`,
  headers: {
    'Content-Type': 'application/json',
  },
})

const v1Client = createClient('/api/v1')

// 共通のリクエスト処理を作成する関数
const apiClient = (basePath: string) => ({
  get: async <T>(path: string = ''): Promise<T> => {
    const response = await v1Client.get<T>(`${basePath}${path}`)
    return response.data
  },

  post: async <T, D = unknown>(path: string = '', data?: D): Promise<T> => {
    const response = await v1Client.post<T>(`${basePath}${path}`, data)
    return response.data
  },

  put: async <T, D = unknown>(path: string = '', data?: D): Promise<T> => {
    const response = await v1Client.put<T>(`${basePath}${path}`, data)
    return response.data
  },

  delete: async (path: string = ''): Promise<void> => {
    await v1Client.delete(`${basePath}${path}`)
  }
})


export default apiClient