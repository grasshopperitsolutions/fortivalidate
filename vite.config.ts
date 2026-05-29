import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // IMPORTANT: base must match your GitHub repository name for GitHub Pages to
  // resolve assets correctly: https://<user>.github.io/<repo-name>/
  base: '/fortivalidate/',
});
