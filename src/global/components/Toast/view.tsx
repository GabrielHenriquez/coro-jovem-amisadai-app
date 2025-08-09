import Animated from "react-native-reanimated";
import Text from "../Text";
import useToastViewModel from "./view.model";
import { IToast } from "./model";
import { styles } from "./styles";
import { Check } from "lucide-react-native";
import * as RN from "react-native";

const Toast = ({ message, visible, onHide }: IToast) => {
  const VIEW_MODEL = useToastViewModel({ visible, onHide });
  return (
    <Animated.View style={[styles.Toast, VIEW_MODEL.animatedStyle || {}]}>
      <RN.View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
        <RN.View
          style={{ width: 28, height: 28, borderRadius: 14 }}
          className=" bg-primary items-center justify-center"
        >
          <Check size={20} strokeWidth={3} color={"#FFF"} />
        </RN.View>

        <Text size={15} className="font-poppinsMedium">{message}</Text>
      </RN.View>
    </Animated.View>
  );
};

export default Toast;
