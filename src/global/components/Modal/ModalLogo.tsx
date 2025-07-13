import { ReactNode } from "react";
import { View } from "react-native";

type Props = {
  children: ReactNode;
};

const ModalLogo = ({ children }: Props) => (
  <View className="items-center justify-center">{children}</View>
);

export default ModalLogo;
