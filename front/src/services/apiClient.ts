import axios from "axios"

const apiUrl = import.meta.env.VITE_API_URL

const apiClient = axios.create({
  baseURL: `${apiUrl}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
  responseType: 'json',
})

export default apiClient