import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  const rootDir = __dirname;

  return {
    base: env.BASE_PATH || "/",

    plugins: [
      react(),
      tailwindcss()
    ],

    resolve: {
      alias: {
        "@": path.resolve(rootDir, "src"),
        "@assets": path.resolve(rootDir, "..", "..", "attached_assets"),
      },
      dedupe: ["react", "react-dom"],
    },

    root: rootDir,

    css: {
      transformer: "postcss",
    },

    build: {
      outDir: path.resolve(rootDir, "dist/public"),
      emptyOutDir: true,
      sourcemap: false,

      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {

              if (id.includes("react")) {
                return "vendor";
              }

              if (id.includes("@radix-ui")) {
                return "radix";
              }

              if (id.includes("@tanstack")) {
                return "react-query";
              }

              if (id.includes("framer-motion")) {
                return "motion";
              }

              if (id.includes("recharts")) {
                return "charts";
              }

              return "libs";
            }
          }
        }
      },

      chunkSizeWarningLimit: 1000
    },

    server: {
      port: Number(env.PORT) || 5173,
      host: "0.0.0.0",
    },

    preview: {
      port: Number(env.PORT) || 5173,
      host: "0.0.0.0",
    },
  };
});