import { colors } from "@styles/colors";
import * as RN from "react-native";
const { width } = RN.Dimensions.get("window");

export const styles = RN.StyleSheet.create({
  Toast: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    top: 60,
    alignSelf: "center",
    backgroundColor: colors.greenLighter,
    borderWidth: 1,
    borderColor: "#cccccc",
    elevation: 3,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 16,
    width: width * 0.9,
    zIndex: 999,
  },
});
