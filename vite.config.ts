import path from "path";
import { defineConfig } from "vite";
import packageJson from "./package.json";
import dts from 'vite-plugin-dts';

const getPackageName = () => {
  return packageJson.name;
};

const getPackageNameCamelCase = () => {
  try {
    return getPackageName().replace(/-./g, (char) => char[1].toUpperCase());
  } catch (err) {
    throw new Error("Name property in package.json is missing.");
  }
};

const fileName = {
  es: `${getPackageName()}.mjs`,
  cjs: `${getPackageName()}.cjs`,
  iife: `${getPackageName()}.iife.js`,
};

export default defineConfig({
  base: "./",
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: getPackageNameCamelCase(),
      formats: ["es", "cjs", "iife"],
      fileName: (format) => fileName[format],
    },
  },
  plugins: [dts()],
  /* for example, use global to avoid globals imports (describe, test, expect): */
  test: {
    globals: true,
  }
});
