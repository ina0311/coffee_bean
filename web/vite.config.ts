/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const config = {
  plugins: [react()],
  server: {
    port: 5173,
    host: true
  }
}

export default defineConfig(config)
