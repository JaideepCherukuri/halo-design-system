import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN',
      'X-XSS-Protection': '1; mode=block',
    },
  },
  build: {
    // Production optimizations
    minify: 'esbuild', // Faster than terser, still removes console logs
    rollupOptions: {
      output: {
        // Manual chunk splitting for better caching
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'three-vendor': ['three', '@react-three/fiber', '@react-three/postprocessing'],
          'animation-vendor': ['gsap'],
        },
      },
    },
    // Source maps for production debugging (disabled for smaller bundle)
    sourcemap: false,
    // Chunk size warning limit
    chunkSizeWarningLimit: 1000,
  },
})
