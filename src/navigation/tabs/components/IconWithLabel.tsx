import { View, Text, ViewStyle } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "@styles/colors";
import { fontFamily } from "@styles/fonts";

const IconWithLabel = ({
  name,
  label,
  focused,
}: {
  name: "calendar" | "users";
  label: string;
  focused: boolean;
}) => {
  const positionStyle: ViewStyle = { alignItems: "center", bottom: -10 };

  return (
    <View style={{ width: 100, justifyContent: "center", ...positionStyle }}>
      <FontAwesome
        name={name}
        size={23}
        color={focused ? colors.primary : "#8f9c8a"}
      />
      <Text
        style={{
          fontSize: 11,
          color: focused ? colors.primary : "#8f9c8a",
          marginTop: 6,
          fontFamily: focused
            ? fontFamily.poppinsBold
            : fontFamily.poppinsSemiBold,
        }}
      >
        {label}
      </Text>
    </View>
  );
};

export default IconWithLabel;
