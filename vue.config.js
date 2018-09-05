module.exports = {
  lintOnSave: true,
  devServer: {
    proxy: {
      "/api/": {
        target: "http://119.3.62.127:4001",
        //target: "http://10.102.21.210:7001",
        changeOrigin: true,
        pathRewrite: {
          "^/api/": "/api/v1/" // rewrite path
        }
      }
    }
  }
};
