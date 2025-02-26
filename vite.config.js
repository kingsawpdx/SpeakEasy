import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/arasaac': {
        target: 'https://api.arasaac.org',  // Updated API URL
        changeOrigin: true,                 // Change the origin to match the target
      },
    },
  },
});
