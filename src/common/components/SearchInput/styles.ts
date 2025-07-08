import { colors } from "@styles/colors";
import { fontFamily } from "@styles/fonts";
import { responsiveSize } from "@utils/responsiveSize";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  contentInput: {
    backgroundColor: colors.grayLighter,
    width: "100%",
    height: responsiveSize(48),
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.gray3,
    elevation: 1
  },
  textInput: {
    flex: 1,
    height: responsiveSize(48),
    fontSize: responsiveSize(16),
    fontFamily: fontFamily.poppinsSemiBold,
    color: colors.black,
  },
  areaIcon: {
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
});
