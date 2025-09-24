import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'logo-ata.png'],
      manifest: {
        name: 'Agenda Virtual ATA',
        short_name: 'Agenda ATA',
        description: 'Sistema de gestión de incidencias escolares I.E. 80002 Antonio Torres Araujo',
        theme_color: '#006B3F',
        background_color: '#FFFFFF',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/logo-ata-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/logo-ata-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        cleanupOutdatedCaches: true,
        skipWaiting: true
      }
    })
  ],
  server: {
    port: 3000
  }
})