import { colors } from "./src/global/styles/colors";
import { fontFamily } from "./src/global/styles/fonts";

const content = [
  "app.{js,jsx,ts,tsx}",
  "./src/routes/**/*.{js,jsx,ts,tsx}",
  "./src/features/**/*.{js,jsx,ts,tsx}",
  "./src/global/components/**/*.{js,jsx,ts,tsx}",
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
