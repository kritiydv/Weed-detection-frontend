import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Weed-detection-frontend/', // 👈 must match repo name exactly
  server: {
    port: 3000, // optional for local dev
  },
})
