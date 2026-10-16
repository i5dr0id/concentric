import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Offline build of the clock for hosts that load it from disk (Wally's desktop
// layer and the WallyClock screen saver): relative paths, single entry.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: 'dist-saver',
    rollupOptions: { input: 'saver.html' },
  },
})
