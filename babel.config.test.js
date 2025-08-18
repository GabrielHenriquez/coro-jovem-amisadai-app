module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
      "@babel/preset-typescript",
    ],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@assets": "./src/assets",
            "@contexts": "./src/contexts",
            "@features": "./src/features",
            "@components": "./src/global/components",
            "@utils": "./src/global/utils",
            "@models": "./src/global/models",
            "@stores": "./src/global/stores",
            "@hooks": "./src/global/hooks",
            "@services": "./src/global/services",
            "@styles": "./src/global/styles",
            "@navigation": "./src/navigation",
          },
          extensions: [".js", ".jsx", ".tsx", ".ts", ".json"],
        },
      ],
      "@babel/plugin-transform-template-literals",
      "react-native-reanimated/plugin",
    ],
  };
};
