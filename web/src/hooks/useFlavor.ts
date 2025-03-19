import { useState, useEffect, useCallback } from 'react'
import { Flavor } from '@coffee-bean/types'
import { flavorApi } from '../api/flavor'

interface UseFlavorOptions {
  autoFetch?: boolean
}

const useFlavor = (options: UseFlavorOptions = { autoFetch: true }) => {
  const [flavors, setFlavors] = useState<Flavor[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  // フレーバーの初期化と取得を行う関数
  const initializeFlavors = useCallback(async () => {
    try {
      setLoading(true)
      const flavorList = await flavorApi.getAll()
      setFlavors(flavorList)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('不明なエラーが発生しました'))
    } finally {
      setLoading(false)
    }
  }, [])

  // 自動フェッチの制御
  useEffect(() => {
    if (options.autoFetch) {
      initializeFlavors()
    }
  }, [options.autoFetch, initializeFlavors])

  // // Create - 新しいフレーバーの追加
  // const createFlavor = useCallback(async (input: CreateInput) => {
  //   try {
  //     setLoading(true)
  //     const newFlavor = await flavorApi.create(input)
  //     setFlavors(prev => [...prev, newFlavor])
  //     return newFlavor
  //   } catch (err) {
  //     setError(err instanceof Error ? err : new Error('作成中にエラーが発生しました'))
  //     throw err
  //   } finally {
  //     setLoading(false)
  //   }
  // }, [])

  // // Update - フレーバーの更新
  // const updateFlavor = useCallback(async (input: UpdateInput) => {
  //   try {
  //     setLoading(true)
  //     const updatedFlavor = await flavorApi.update(input)
  //     setFlavors(prev =>
  //       prev.map(flavor =>
  //         flavor.id === input.id ? updatedFlavor : flavor
  //       )
  //     )
  //     return updatedFlavor
  //   } catch (err) {
  //     setError(err instanceof Error ? err : new Error('更新中にエラーが発生しました'))
  //     throw err
  //   } finally {
  //     setLoading(false)
  //   }
  // }, [])

  // // Delete - フレーバーの削除
  // const deleteFlavor = useCallback(async (id: string) => {
  //   try {
  //     setLoading(true)
  //     await flavorApi.delete(id)
  //     setFlavors(prev => prev.filter(flavor => flavor.id !== id))
  //   } catch (err) {
  //     setError(err instanceof Error ? err : new Error('削除中にエラーが発生しました'))
  //     throw err
  //   } finally {
  //     setLoading(false)
  //   }
  // }, [])

  // // Search - フレーバーの検索
  // const searchFlavor = useCallback((searchTerm: string): Flavor[] => {
  //   const search = (items: Flavor[]): Flavor[] => {
  //     return items.filter(item => {
  //       const matchesName = item.name.toLowerCase().includes(searchTerm.toLowerCase())
  //       const childMatches = item.children ? search(item.children).length > 0 : false
  //       return matchesName || childMatches
  //     })
  //   }
  //   return search(flavors)
  // }, [flavors])

  // // Get by ID - 特定のフレーバーの取得
  // const getFlavorById = useCallback((id: string): Flavor | null => {
  //   const find = (items: Flavor[]): Flavor | null => {
  //     for (const item of items) {
  //       if (item.id === id) return item
  //       if (item.children) {
  //         const found = find(item.children)
  //         if (found) return found
  //       }
  //     }
  //     return null
  //   }
  //   return find(flavors)
  // }, [flavors])

  return {
    // データ
    flavors,
    loading,
    error,
    // CRUD操作
    // createFlavor,
    // getFlavorById,
    // updateFlavor,
    // deleteFlavor,
    // // ユーティリティ
    // searchFlavor,
    refreshFlavors: initializeFlavors
  }
}


export default useFlavor