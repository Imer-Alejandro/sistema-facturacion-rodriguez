import { fileURLToPath, URL } from 'node:url'
import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      manifest: {
        name: 'Sistema de Inventario Rodríguez',
        short_name: 'Inventario',
        description: 'Una aplicación de inventario',
        start_url: '/',
        display: 'fullscreen',
        background_color: '#E55226',
        theme_color: '#FFB984',
        icons: [
          {
            src: "/icons/icon-250x250.png",
            sizes: "250x250",
            type: "image/png"
          },
          {
            src:"/icons/icon-192x192.png",
            sizes:"192x192",
            type:"image/png",
            purpose: 'maskable',
          }
        ]
      },
      workbox: {
        clientsClaim: true,
        skipWaiting: true
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
