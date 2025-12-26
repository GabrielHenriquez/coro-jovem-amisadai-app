import { ChevronLeft } from "lucide-react-native";
import { colors, IColors } from "@styles/colors";
import { ReactNode } from "react";
import * as RN from "react-native";
import StatusBar from "./StatusBar";
import Text from "./Text";

interface HeaderProps {
  color?: IColors;
  bgColor?: IColors;
  title?: string;
  icon?: ReactNode;
  hasButtonSecondary?: boolean;
  onPressBack?: VoidFunction;
  onPressSecondary?: VoidFunction;
}

export const Header = ({
  color = "black",
  bgColor = "background",
  title,
  icon,
  hasButtonSecondary,
  onPressBack,
  onPressSecondary,
}: HeaderProps) => {
  const iconColor = colors[color];

  return (
    <>
      <StatusBar backgroundColor={bgColor} barStyle="light-content" />

      <RN.View
        className="flex-row items-center justify-between px-4 py-4"
        style={{ backgroundColor: colors[bgColor] }}
      >
        <RN.TouchableOpacity
          onPress={onPressBack}
          className="w-10 items-center justify-center"
        >
          <ChevronLeft size={36} color={iconColor} />
        </RN.TouchableOpacity>

        {title && (
          <Text
            size={20}
            className="flex-1 text-center font-poppinsSemiBold text-white"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {title}
          </Text>
        )}

        {hasButtonSecondary ? (
          <RN.TouchableOpacity
            onPress={onPressSecondary}
            className="w-10 items-center justify-center"
          >
            {icon}
          </RN.TouchableOpacity>
        ) : (
          <RN.View className="w-10" />
        )}
      </RN.View>
    </>
  );
};

export default Header;
