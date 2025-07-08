import StatusBar from "./StatusBar";
import Text from "./Text";
import { ChevronLeft } from "lucide-react-native";
import { colors, IColors } from "@styles/colors";
import { ReactNode } from "react";
import * as RN from "react-native";

const Header = ({
  color = "black",
  bgColor = "background",
  hasButtonSecondary,
  onPressSecondary,
  icon,
  title,
  onPressBack,
}: {
  color?: IColors;
  bgColor?: IColors;
  title?: string;
  icon?: ReactNode;
  hasButtonSecondary?: boolean;
  onPressBack?: VoidFunction;
  onPressSecondary?: VoidFunction;
}) => {
  return (
    <>
      <StatusBar backgroundColor={bgColor} />
      <RN.View style={[Styles.Container, { backgroundColor: colors[bgColor] }]}>
        <RN.View className="flex-row gap-1 items-center">
          <RN.TouchableOpacity style={Styles.BackButton} onPress={onPressBack}>
            <ChevronLeft size={45} color={colors[color]} />
          </RN.TouchableOpacity>
          {title && (
            <Text className="font-poppinsBold text-black" size={26}>
              {title}
            </Text>
          )}
        </RN.View>

        {hasButtonSecondary && (
          <RN.TouchableOpacity onPress={onPressSecondary}>
            {icon}
          </RN.TouchableOpacity>
        )}
      </RN.View>
    </>
  );
};

const Styles = RN.StyleSheet.create({
  Container: {
    paddingTop: 8,
    paddingBottom: 4,
    paddingRight: 14,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  BackButton: {},
});

export default Header;
