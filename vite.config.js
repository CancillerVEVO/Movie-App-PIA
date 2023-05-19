import path from "path";

export default {
  root: path.resolve(__dirname, "src"),
  server: {
    port: 8080,
    hot: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
};
