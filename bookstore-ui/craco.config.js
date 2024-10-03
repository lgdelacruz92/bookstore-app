// craco.config.js
const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "bookstore-shared": "/app/bookstore-shared",
      "@pages": path.resolve(__dirname, "src/pages"),
      "@services": path.resolve(__dirname, "src/services"),
      "@components": path.resolve(__dirname, "src/components"),
    },
  },
};
