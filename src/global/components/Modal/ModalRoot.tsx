import { ReactNode } from "react";
import { View } from "react-native";

type InputRootProps = {
  children: ReactNode;
};

const ModalRoot = ({ children }: InputRootProps) => (
  <View className="w-full">{children}</View>
);

export default ModalRoot;
