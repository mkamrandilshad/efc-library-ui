import { defineConfig } from "tsup";
import { copyFileSync, mkdirSync } from "fs";
import { dirname } from "path";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom"],
  treeshake: true,
  minify: process.env.NODE_ENV === "production",
  publicDir: false,
  onSuccess: () => {
    const cssSource = "src/styles/index.css";
    const cssDest = "dist/styles/index.css";
    try {
      mkdirSync(dirname(cssDest), { recursive: true });
      copyFileSync(cssSource, cssDest);
      console.log("✓ CSS file copied to dist");
    } catch (error) {
      console.error("Failed to copy CSS file:", error);
    }
  },
});

