import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver} from "unplugin-vue-components/resolvers";

import { customTheme } from "./antd.theme.js";

const path = require("path");

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") }
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: customTheme,
        javascriptEnabled: true,
      }
    }
  },
  plugins: [
    vue(),
    Components({
      resolvers: [AntDesignVueResolver({
        importStyle: "less"
      })],
    })
  ],
});

