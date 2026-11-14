import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://arif.impactory.id",
  output: "static",
  compressHTML: true,
  build: { inlineStylesheets: "auto" },
});
