import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  outDir: "dist",
  sourcemap: true,
  clean: true,
  minify: true,
  splitting: false,
  external: ["date-fns"],
});