import { LogoAmisadai } from "@assets/images";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Menu } from "lucide-react-native";
import * as RN from "react-native";

const HeaderWithMenu = ({ styleRest }: { styleRest?: RN.ViewStyle }) => {
  const { dispatch } = useNavigation();
  return (
    <RN.View
      style={{
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 8,
        paddingTop: 18,
        ...styleRest,
      }}
    >
      <RN.TouchableOpacity
        onPress={() => dispatch(DrawerActions.openDrawer())}
        style={{
          position: "absolute",
          left: 16,
        }}
      >
        <Menu size={36} color="#FFF" />
      </RN.TouchableOpacity>

      <LogoAmisadai width={140} height={70} />
    </RN.View>
  );
};

export default HeaderWithMenu;
