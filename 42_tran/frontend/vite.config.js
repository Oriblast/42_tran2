import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Définir global pour le navigateur
const globalForBrowser = `
  var global = typeof globalThis !== 'undefined' ? globalThis : typeof self !== 'undefined' ? self : this;
`;

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/variables.scss";`, // Si vous avez des variables globales SCSS
      },
    },
  },
  server: {
    host: true, // écoute sur toutes les interfaces
    https: {
      key: './ssl/private-key.pem',
      cert: './ssl/certificate.pem',
    },
    port: 3000,
  }, 
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        intro: globalForBrowser, // Ajouter la définition de global au début du bundle
      },
    },
  },
});
