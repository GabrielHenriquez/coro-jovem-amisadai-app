import * as RN from "react-native";
import React from "react";
import { responsiveSize } from "@utils/responsiveSize";

interface ResponsiveTextProps extends RN.TextProps {
  size?: number;
  className?: string;
  style?: RN.TextStyle;
}

const Text = ({
  size = 16,
  children,
  className,
  style,
  ...rest
}: ResponsiveTextProps) => {
  return (
    <RN.Text
      className={className}
      style={[{ fontSize: responsiveSize(size) }, style]}
      {...rest}
    >
      {children}
    </RN.Text>
  );
};

export default Text;
