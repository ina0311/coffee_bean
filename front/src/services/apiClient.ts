import axios, {AxiosInstance, AxiosError} from "axios"

const apiUrl = import.meta.env.VITE_API_URL

axios.defaults.withCredentials = true

const apiClient: AxiosInstance = axios.create({
  baseURL: `${apiUrl}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
  responseType: 'json',
})

apiClient.interceptors.response.use(response => response, (error: AxiosError) => {
    // ここでエラーレスポンスを処理します
    return Promise.reject(error)
  }
)

export default apiClient