const { getDefaultConfig } = require("@expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

const {
  wrapWithReanimatedMetroConfig,
} = require("react-native-reanimated/metro-config");

if (!config.resolver.sourceExts.includes("cjs")) {
  config.resolver.sourceExts.push("cjs");
}

config.resolver.assetExts = config.resolver.assetExts.filter(
  (ext) => ext !== "svg"
);

config.resolver.sourceExts = [
  ...new Set([...config.resolver.sourceExts, "svg", "ts", "tsx"]),
];

config.transformer = {
  ...config.transformer,
  babelTransformerPath: require.resolve("react-native-svg-transformer"),
};

module.exports = wrapWithReanimatedMetroConfig(
  withNativeWind(config, { input: "./src/common/styles/global.css" })
);
