let config;
try {
  // __DEFINE__ is a global variable injected through webpack's DefinePlugin
  // https://webpack.js.org/guides/production-build/
  config = __DEFINE__;
} catch (err) {
  config = {};
}

const { PROTOCOL, HOST, PORT } = config;

const settings = { PROTOCOL, HOST, PORT };

export default settings;
