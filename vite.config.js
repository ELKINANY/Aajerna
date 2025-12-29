import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
	base: "/Aajerna/",
	plugins: [react(), tailwindcss()],
<<<<<<< HEAD
=======
	server: {
		proxy: {
			'/api': {
				target: 'https://hadithapi.com',
				changeOrigin: true,
				secure: false,
			}
		}
	}
>>>>>>> 454e43c01fc00225425b6a0e6d4b439199ccb418
});
