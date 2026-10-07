import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Relative base: works at both <app>.cherri.group/ and cherri.group/<app>/
  base: './',
  plugins: [react(), tailwindcss()],
})
