import react from '@vitejs/plugin-react';
import * as path from 'path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      srcDir: 'src',
      filename: 'sw.ts',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,webp,avif}'],
        sourcemap: true,
      },
      strategies: 'injectManifest',
      devOptions: {
        enabled: true,
        type: 'module',
      },
      includeAssets: ['**/*'],
      manifest: {
        theme_color: '#f69435',
        background_color: '#f69435',
        display: 'standalone',
        scope: '/',
        id: '/',
        start_url: '/',
        short_name: 'patterns',
        description: 'patterns pwa',
        name: 'patterns project',
        icons: [
          {
            src: 'favicons/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'favicons/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'favicons/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'favicons/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: [
      {
        find: '@app',
        replacement: path.resolve(__dirname, 'src/app'),
      },
    ],
  },
});
