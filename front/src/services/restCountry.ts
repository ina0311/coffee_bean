import axios, {AxiosInstance, AxiosError} from "axios"

const restCountryClient: AxiosInstance = axios.create({
  baseURL: `https://restcountries.com/v3.1`,
  headers: {
    'Content-Type': 'application/json',
  },
  responseType: 'json',
})

restCountryClient.interceptors.response.use(response => response, (error: AxiosError) => {
  // ここでエラーレスポンスを処理します
  return Promise.reject(error)
})

export default restCountryClient