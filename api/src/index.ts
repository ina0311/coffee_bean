import 'reflect-metadata'
import express from 'express'
import cors from 'cors'
import { initializeDatabase } from './database/data-source'
import router from './routes'

const app = express()

app.use(cors())
app.use(express.json())

app.use(router)

const startServer = async () => {
  try {
    await initializeDatabase()
    
    const PORT = process.env.PORT || 3000
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

startServer()
