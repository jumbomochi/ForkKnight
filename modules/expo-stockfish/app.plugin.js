const { withPlugins } = require("@expo/config-plugins");

// No platform-specific config required beyond the local module being
// picked up by autolinking via expo-module.config.json. The plugin exists
// so the module can be referenced from app.json in a stable way.
module.exports = function withExpoStockfish(config) {
  return withPlugins(config, []);
};
