import { ReactElement } from "react";
import { View } from "react-native";

interface InputIconProps {
  errors?: boolean;
  icon: ReactElement;
  iconError: ReactElement;
}

const InputIcon = ({ errors, icon, iconError }: InputIconProps) => (
  <View className="px-3">{errors ? iconError : icon}</View>
);

export default InputIcon;
