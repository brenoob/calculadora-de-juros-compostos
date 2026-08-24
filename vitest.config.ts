import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["{app,lib}/**/*.test.{ts,tsx}"],
    coverage: {
      reporter: ["text", "lcov"],
      include: ["app/**", "lib/**"],
      exclude: ["app/layout.tsx", "app/components/**/index.ts"],
    },
  },
  resolve: {
    alias: {
      "@": import.meta.dirname,
    },
  },
});
