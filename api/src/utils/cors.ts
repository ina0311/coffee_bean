import cors from 'cors'
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173'

const corsOptions = {
  origin: frontendUrl,
  optionsSuccessStatus: 200
}

export default cors(corsOptions)