import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	server: {
    allowedHosts: ["39fac67ea18b.ngrok-free.app"],
		proxy: {
			'/api': {
				target: 'https://hadithapi.com',
				changeOrigin: true,
				secure: false,
			}
		}
	}
});
