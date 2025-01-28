import React, { useEffect, useState } from 'react'
import { Coffee } from '../types/api'
import { coffeeApi } from '../api/coffee'

export const Home: React.FC = () => {
  const [coffees, setCoffees] = useState<Coffee[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCoffees = async () => {
      try {
        const response = await coffeeApi.getAll()
        setCoffees(response.data)
      } catch (err) {
        setError('コーヒーの取得に失敗しました')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchCoffees()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  return (
    <div>
      <h1>コーヒー一覧</h1>
      <div className="coffee-grid">
        {coffees.map((coffee) => (
          <div key={coffee.id} className="coffee-card">
            <h2>{coffee.name}</h2>
            <p>{coffee.description}</p>
            <p>¥{coffee.price}</p>
          </div>
        ))}
      </div>
    </div>
  )
} 