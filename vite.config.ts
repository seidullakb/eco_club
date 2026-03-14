import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
});

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000, // This increases the limit from 500kb to 1000kb
  },
})
