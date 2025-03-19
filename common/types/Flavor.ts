export interface Flavor {
  id: number
  name: string
  color: string
  parentId: number | null
  parent?: Flavor | null
  createdAt: Date
  updatedAt: Date
}
