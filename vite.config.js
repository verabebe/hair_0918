import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// http://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://192.168.100.45:8000",
        changeOrigin: true,
        //changeOrigin: true 是 Vite Proxy 再轉送 API 請求時，把 HTTP Request 裡面的 Host 標頭改成後端伺服器的位址。
      },
    },
  },
});
