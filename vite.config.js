import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Alias for the src folder
    },
  },
  server: {
    host: true, // Expose to all network interfaces
    port: 5173, // Default port
    open: true, // Open browser on start
    strictPort: true, // If port is in use, exit
    cors: true, // Enable CORS
    hmr: {
      overlay: true, // Show errors as overlay
    },
  },
});
