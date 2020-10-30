module.exports = {
  devServer: {
    host: '0.0.0.0',
    port: 4000,
    disableHostCheck: true,
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
        },
      },
    },
  },
};
