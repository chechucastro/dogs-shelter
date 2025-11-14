import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Split node_modules into vendor chunks
          if (id.includes('node_modules')) {
            // Keep Element Plus in main bundle to avoid initialization issues
            // Split other large dependencies
            if (id.includes('vue-router')) {
              return 'vue-router'
            }
            if (id.includes('pinia')) {
              return 'pinia'
            }
            // Split Element Plus icons separately (they're safe to split)
            if (id.includes('@element-plus/icons-vue')) {
              return 'element-plus-icons'
            }
            // Other node_modules (excluding element-plus to keep it in main bundle)
            if (!id.includes('element-plus')) {
              return 'vendor'
            }
          }
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test-setup.ts'
  }
})

