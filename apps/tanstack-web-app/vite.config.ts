import { URL, fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { nitro } from 'nitro/vite'
import dotenv from 'dotenv'

dotenv.config()

const config = defineConfig({
  plugins: [devtools(), nitro(), tanstackStart(), viteReact(), tailwindcss()],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    tsconfigPaths: true,
  },

  // Configure Vite to bundle @convex-dev/better-auth during SSR to avoid module resolution issues
  ssr: {
    noExternal: ['@convex-dev/better-auth'],
  },
})

export default config
