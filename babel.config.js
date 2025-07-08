module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@assets": "./src/assets",
            "@contexts": "./src/contexts",
            "@screens": "./src/screens",
            "@components": "./src/common/components",
            "@utils": "./src/common/utils",
            "@models": "./src/common/models",
            "@stores": "./src/common/stores",
            "@hooks": "./src/common/hooks",
            "@services": "./src/common/services",
            "@styles": "./src/common/styles",
            "@routes": "./src/routes",
          },
          extensions: [".js", ".jsx", ".tsx", ".ts", ".json"],
        },
      ],
      "@babel/plugin-transform-template-literals",
      "react-native-reanimated/plugin",
    ],
  };
};
