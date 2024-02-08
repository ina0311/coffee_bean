import axios from 'axios'
const GOOGLE_MAP_API_KEY = process.env.VITE_GOOGLE_MAP_API_KEY

const GOOGLE_MAP_API_URL = 'https://maps.googleapis.com/maps/api/place'

const googleMapClient = axios.create({
  baseURL: GOOGLE_MAP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  responseType: 'json',
  params: {
    language: 'ja',
    key: GOOGLE_MAP_API_KEY,
  },
})

export const textMapSearch = async (query: string) => {
  const response = await googleMapClient.get('/textsearch/json', {
    params: {query},
  })
  return response.data
}

export const placeDetail = async (placeId: string) => {
  const response = await googleMapClient.get('/details/json', {
    params: {place_id: placeId},
  })
  return response.data
}