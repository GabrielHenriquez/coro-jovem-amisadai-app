import React from "react";
import * as RN from "react-native";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { colors, IColors } from "@styles/colors";

interface ButtonProps extends RN.TouchableOpacityProps {
  bgColor?: IColors;
  activeLoading?: boolean;
  styleRest?: RN.ViewStyle;
}
const { height } = RN.Dimensions.get("window");

const Button = ({
  activeLoading,
  children,
  bgColor = "primary",
  styleRest,
  ...rest
}: ButtonProps) => {
  return (
    <TouchableOpacity
      className="w-full h-12 rounded-lg justify-center"
      style={[
        { backgroundColor: colors[bgColor], height: height * 0.06, alignItems: "center" },
        styleRest,
      ]}
      {...rest}
    >
      {activeLoading ? (
        <ActivityIndicator size={25} color="#FFFFFF" />
      ) : (
        <View className="flex-row items-center space-x-2 gap-2.5">
          {children}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Button;
