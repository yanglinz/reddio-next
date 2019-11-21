const TreatPlugin = require("treat/webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = async ({ config, mode }) => {
  config.module.rules.push({
    test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
    loader: "file-loader"
  });

  config.resolve.alias = config.resolve.alias || {};
  config.resolve.alias["react-native$"] = "react-native-web";

  config.plugins = [].concat(config.plugins, [
    new TreatPlugin({
      outputLoaders: [MiniCssExtractPlugin.loader]
    }),
    new MiniCssExtractPlugin()
  ]);

  return config;
};
