import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'
import envCompatible from 'vite-plugin-env-compatible'

export default defineConfig({
  plugins: [react(), envCompatible()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
