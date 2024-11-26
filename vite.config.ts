import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'], // Tách các thư viện lớn
          uiLibrary: ['antd'], // Tách thư viện UI
        },
      },
    },
  },
})
