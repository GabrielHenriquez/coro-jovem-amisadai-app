import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@styles/colors";

const AddButton = ({
  onPress,
  screenFocused,
}: {
  onPress: () => void;
  screenFocused: "Calls" | "Members";
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.primary,
      width: 70,
      height: 52.5,
      top: -28,
      borderRadius: 18,
      alignSelf: "center",
    }}
  >
    {screenFocused === "Calls" ? (
      <Ionicons name="add" size={40} color="#FFF" />
    ) : (
      <Ionicons name="person-add" size={28} color="#FFF" />
    )}
  </TouchableOpacity>
);

export default AddButton;
