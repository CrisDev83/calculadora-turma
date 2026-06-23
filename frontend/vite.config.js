import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./", // assets com caminho relativo — necessário para GitHub Pages
  server: {
    port: 5173,
  },
});
