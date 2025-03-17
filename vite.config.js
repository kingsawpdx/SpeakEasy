import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()], // Enable React support
  test: {
    include: ["src/**/*.test.jsx"], // Only run tests in the src directory
    exclude: ["api/backend-tests/**"], // Explicitly ignore API tests
    environment: 'jsdom', // Use jsdom for browser-like environment
    globals: true, // Enable global variables like `describe`, `it`, and `expect`
  },
});