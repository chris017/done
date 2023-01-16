const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:8080", //redirect 3000 to 8080 "cross origin"
      changeOrigin: true,
    })
  );
};
