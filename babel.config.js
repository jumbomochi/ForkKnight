module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@": "./src",
            "@components": "./src/components",
            "@screens": "./app",
            "@services": "./src/services",
            "@hooks": "./src/hooks",
            "@utils": "./src/utils",
            "@types": "./src/types",
            "@stores": "./src/stores",
            "@data": "./src/data",
          },
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
