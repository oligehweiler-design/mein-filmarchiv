import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// GitHub Pages: Repo-Name = "mein-filmarchiv"
// Die Seite läuft unter https://oligehweiler-design.github.io/mein-filmarchiv/
const REPO_NAME = 'mein-filmarchiv';

export default defineConfig({
  base: `/${REPO_NAME}/`,
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'Mein Filmarchiv',
        short_name: 'Filmarchiv',
        description: 'Deine persönliche Filmsammlung – verwalten, bewerten, entdecken.',
        theme_color: '#111827',
        background_color: '#f7f7f5',
        display: 'standalone',
        orientation: 'portrait',
        start_url: `/${REPO_NAME}/`,
        scope: `/${REPO_NAME}/`,
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,woff2}'],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
      },
      devOptions: {
        enabled: true,
        type: 'module',
      },
    }),
  ],
});
