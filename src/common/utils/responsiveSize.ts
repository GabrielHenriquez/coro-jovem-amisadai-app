import { Dimensions } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const BASE_WIDTH = 425;

export function responsiveSize(size: number) {
  const scale = SCREEN_WIDTH / BASE_WIDTH;
  return Math.round(size * scale);
}
