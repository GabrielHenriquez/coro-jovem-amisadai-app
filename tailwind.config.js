import { colors } from "./src/common/styles/colors";
import { fontFamily } from "./src/common/styles/fonts";

const content = [
  "app.{js,jsx,ts,tsx}",
  "./src/routes/**/*.{js,jsx,ts,tsx}",
  "./src/screens/**/*.{js,jsx,ts,tsx}",
  "./src/common/components/**/*.{js,jsx,ts,tsx}",
];

/** @type {import('tailwindcss').Config} */
module.exports = {
  content,
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors,
      fontFamily,
    },
  },
  plugins: [],
  corePlugin: {
    backgroundOpacity: true,
  },
};
