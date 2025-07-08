import Text from "@components/Text";
import { TextProps } from "react-native";

interface Props extends TextProps {
  children: React.ReactNode;
}

const ModalSubtitle = ({ children, ...rest }: Props) => (
  <Text className="font-poppinsMedium text-grayDark text-center">
    {children}
  </Text>
);

export default ModalSubtitle;
