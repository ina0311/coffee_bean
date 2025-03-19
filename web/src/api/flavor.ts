import apiClient from './client'
import { Flavor } from '@coffee-bean/types'

// 基本的な入力フィールド
type BaseInput = {
  name: string
}

// 親子関係のフィールド
type WithParent = {
  parentId?: string
}

// 作成時の入力型
type CreateInput = BaseInput & WithParent

// 更新時の入力型（nameのみ更新可能）
type UpdateInput = Pick<BaseInput, 'name'>

const request = apiClient('/flavors')

export const flavorApi = {
  getAll: async () => {
    const response = await request.get<{ data: Flavor[] }>()
    return response.data
  },

  create: async (input: CreateInput) => {
    const flavor = await request.post<Flavor, CreateInput>('', input)
    return flavor
  },

  update: async (id: string, input: UpdateInput) => {
    const flavor = await request.put<Flavor, UpdateInput>(`/${id}`, input)
    return flavor
  },

  delete: (id: string) => request.delete(`/${id}`)
}
