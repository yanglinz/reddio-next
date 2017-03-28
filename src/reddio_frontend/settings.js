let config;
try {
  // __DEFINE__ is a global variable injected through webpack's DefinePlugin
  // https://webpack.js.org/guides/production-build/
  config = __DEFINE__;
} catch (err) {
  config = {};
}

export default config;
