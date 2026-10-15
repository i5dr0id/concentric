import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Served from https://i5dr0id.github.io/concentric/
  base: '/concentric/',
  plugins: [react()],
})
