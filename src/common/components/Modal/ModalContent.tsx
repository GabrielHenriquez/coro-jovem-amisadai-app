import { ReactNode } from "react";
import * as RN from "react-native";

interface IProps extends RN.ModalProps {
  children: ReactNode;
}

const ModalContent = ({ children, ...rest }: IProps) => {
  const { height } = RN.useWindowDimensions();
  return (
    <RN.Modal
      transparent
      animationType="fade"
      statusBarTranslucent
      className="flex-1"
      {...rest}
    >
      <RN.View
        className="justify-center items-center px-12"
        style={{
          height: height + RN.StatusBar?.currentHeight!,
          backgroundColor: "rgba(0,0,0, 0.6)",
        }}
      >
        <RN.View className="w-full min-h-14 rounded-2xl bg-white items-center justify-center py-5 px-4 gap-2.5">
          {children}
        </RN.View>
      </RN.View>
    </RN.Modal>
  );
};

export default ModalContent;
