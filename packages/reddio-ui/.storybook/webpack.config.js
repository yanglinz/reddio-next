module.exports = {
  module: {
    rules: [
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: "file-loader",
      }
    ]
  },
  resolve: {
    alias: {
      "react-native$": "react-native-web"
    }
  }
};
