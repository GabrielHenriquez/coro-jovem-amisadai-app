import React from "react";
import * as RN from "react-native";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { colors, IColors } from "@styles/colors";
import { getHeight } from "@utils/index";

interface ButtonProps extends RN.TouchableOpacityProps {
  bgColor?: IColors;
  activeLoading?: boolean;
  styleRest?: RN.ViewStyle;
}

const Button = ({
  activeLoading,
  children,
  bgColor = "primary",
  styleRest,
  ...rest
}: ButtonProps) => {
  return (
    <TouchableOpacity
      className="w-full  rounded-lg justify-center"
      style={[
        {
          backgroundColor: colors[bgColor],
          height: getHeight * 0.052,
          alignItems: "center",
        },
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
