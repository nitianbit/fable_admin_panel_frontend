// vue.config.js
module.exports = {
  configureWebpack: {
    devtool: "source-map",
  },
  // options...
  devServer: {
    port: 8000,
  },
  // Set environment variables
  chainWebpack: (config) => {
    config.plugin("define").tap((definitions) => {
      Object.assign(definitions[0]["process.env"], {
        VUE_APP_API_URL: JSON.stringify(
          process.env.VUE_APP_API_URL || "http://localhost:8082/v1"
        ),
      });
      return definitions;
    });
  },
};
