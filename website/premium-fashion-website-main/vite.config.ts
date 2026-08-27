import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// GitHub Pages project-site deployment.
// The single-file build keeps the current design, CSS and JS self-contained,
// while base ensures any generated project URLs resolve from the repo path.
export default defineConfig({
  base: "/guthani-premium-fashion-website/",
  plugins: [react(), tailwindcss(), viteSingleFile()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    fs: {
      allow: [
        path.resolve(__dirname, "../.."),
        path.resolve(__dirname),
      ],
    },
  },
  build: {
    target: "es2020",
  },
});
