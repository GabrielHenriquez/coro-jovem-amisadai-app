import { colors, IColors } from "@styles/colors";
import * as Native from "react-native";
interface StatusBarParams extends Native.StatusBarProps {
  backgroundColor: IColors;
}

const StatusBar = ({ backgroundColor, ...rest }: StatusBarParams) => {
  const styleViewIos = [
    {
      height: Native.StatusBar.currentHeight,
      backgroundColor: colors[backgroundColor] ?? colors.black,
    },
  ];
  const styleViewAndroid = [{ height: Native.StatusBar.currentHeight }];

  return (
    <Native.View
      style={Native.Platform.OS !== "android" ? styleViewIos : styleViewAndroid}
    >
      <Native.SafeAreaView>
        <Native.StatusBar
          translucent
          barStyle={"dark-content"}
          backgroundColor={colors[backgroundColor]}
          {...rest}
        />
      </Native.SafeAreaView>
    </Native.View>
  );
};

export default StatusBar;
