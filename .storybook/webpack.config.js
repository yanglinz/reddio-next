module.exports = async ({ config, mode }) => {
  config.module.rules.push({
    test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
    loader: "file-loader"
  });

  config.resolve.alias = config.resolve.alias || {};
  config.resolve.alias["react-native$"] = "react-native-web";

  return config;
};
