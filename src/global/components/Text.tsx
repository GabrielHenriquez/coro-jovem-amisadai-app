import * as RN from "react-native";
import { responsiveSize } from "@utils/index";

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
      allowFontScaling={false}
      style={[{ fontSize: responsiveSize(size), lineHeight: size + 5 }, style]}
      {...rest}
    >
      {children}
    </RN.Text>
  );
};

export default Text;
