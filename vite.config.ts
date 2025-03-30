import { defineConfig } from 'vite'

export default defineConfig({
	server: {
		hmr: true, // Ensure HMR is enabled,
		watch: { usePolling: true }
	},
	build: {
		sourcemap: true // Enable source maps
	}
})
