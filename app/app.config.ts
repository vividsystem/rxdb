import { defineConfig } from "@solidjs/start/config";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  vite: {
		resolve: {
			alias: {
        "~": path.resolve(process.cwd(), "src"),
        "@": path.resolve(process.cwd(), "drizzle"),
      },
		},
		plugins: [tailwindcss()],
    ssr: { external: ["drizzle-orm"] },
  },
});
