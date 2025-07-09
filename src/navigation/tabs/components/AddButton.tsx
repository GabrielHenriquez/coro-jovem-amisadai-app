import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@styles/colors";

const AddButton = ({ onPress }: { onPress: () => void }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.primary,
      width: 55,
      height: 55,
      top: -28,
      borderRadius: 50,
      alignSelf: "center",
    }}
  >
    <Ionicons name="add" size={46} color="#FFF" />
  </TouchableOpacity>
);

export default AddButton;
