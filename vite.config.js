import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        distributors: "distributors.html",
        sales: "sales.html",
        stock: "stock.html",
        empties: "empties.html",
        transit: "transit.html"
      }
    }
  }
});