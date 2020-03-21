module.exports = async ({ config, mode }) => {
  config.module.rules.push({
    test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
    loader: "file-loader"
  });

  return config;
};
