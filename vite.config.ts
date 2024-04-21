import path from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
    viteStaticCopy({
      targets: [
        {
          src: path.resolve(__dirname, "./src/**") + "/*.d.ts",
          dest: "./",
        },
      ],
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "Fetchjs",
      formats: ["es", "umd"],
      fileName: (format) => `index.${format}.js`,
    },
  },
});
