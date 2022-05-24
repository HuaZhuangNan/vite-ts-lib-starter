import { defineConfig } from "vitest/config";

export default defineConfig({
  /* for example, use global to avoid globals imports (describe, test, expect): */
  test: {
    globals: true,
  },
});
