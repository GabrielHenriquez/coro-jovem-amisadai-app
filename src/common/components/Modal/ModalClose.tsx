import { X, XCircle } from "lucide-react-native";
import * as RN from "react-native";

type Props = {
  onClose: () => void;
};

const AreaModalClose = ({ onClose }: Props) => (
  <RN.View className="w-full items-end">
    <RN.TouchableOpacity className="w-8 items-center" onPress={onClose}>
      <X color="black" size={30} />
    </RN.TouchableOpacity>
  </RN.View>
);

export default AreaModalClose;
