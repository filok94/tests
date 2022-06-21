import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [
    vue({
      reactivityTransform: true,
    }),
  ],

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/assets/vars";
                         @import "./src/assets/mixins";`,
      },
    },
  },
});
