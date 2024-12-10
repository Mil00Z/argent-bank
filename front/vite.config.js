import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  watch: {
    usePolling: true
  },
  resolve: {
    alias: {
      '@root': '/src',
      '@assets': '/src/assets',
      '@styles': '/src/styles',
      '@components': '/src/components',
      '@datas': '/src/datas',
    },
  },
})
