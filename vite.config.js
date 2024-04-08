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
        background_color: '#FFFFFF',
        theme_color: '#FFB984',
        icons: [
          {
            src: "/icons/icon-250x250.png",
            sizes: "250x250",
            type: "image/png",
            density: "2.0"
          },
          {
            src: "/icons/icon-144x144.png",
            sizes: "250x250",
            type: "image/png",
            density: "3.0",
            purpose: 'maskable',
          },
          {
            src:"/icons/icon-192x192.png",
            sizes:"192x192",
            type:"image/png"
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
