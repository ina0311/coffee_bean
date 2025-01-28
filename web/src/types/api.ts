export interface Coffee {
  id: number
  name: string
  description: string
  price: number
  created_at: string
  updated_at: string
}

export interface ApiResponse<T> {
  data: T
  message: string
}
