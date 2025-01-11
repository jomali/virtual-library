import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "happy-dom",
    globals: true,
    include: ["**/src/**/*.{test,spec}.{js,jsx,ts,tsx}"],
    setupFiles: ["./config/vitest.setup.ts"],
  },
});
