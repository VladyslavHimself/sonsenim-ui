import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import {nodePolyfills} from "vite-plugin-node-polyfills";
import {VitePWA} from "vite-plugin-pwa";

export default defineConfig({
  plugins: [react(), nodePolyfills(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'Sonsenim LMS',
        display: 'standalone',
        orientation: 'portrait',
        short_name: 'Sonsenim',
        theme_color: '#f4f4f4',
        icons: [
          {
            src: 'pwa-64x64.png',
            sizes: '64x64',
            type: 'image/png'
          },
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ],
      },
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: "http://localhost:3333",
        changeOrigin: true
      }
    }
  }
})
