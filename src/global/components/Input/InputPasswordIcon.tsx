import { colors } from "@styles/colors";
import { Eye, EyeClosed } from "lucide-react-native";
import { ReactNode } from "react";
import * as RN from "react-native";

interface InputIconPasswordProps extends RN.PressableProps {
  secureTextActive: boolean;
  errors: boolean;
}

const myIcons: Record<string, ReactNode> = {
  true: <EyeClosed color={colors.primary} />,
  false: <Eye color={colors.primary} />,
  trueError: <EyeClosed color={colors.redDark} />,
  falseError: <Eye color={colors.redDark} />,
};

const InputPasswordIcon = ({
  secureTextActive,
  errors,
  ...rest
}: InputIconPasswordProps) => {
  let iconKey = `${secureTextActive}`;
  if (errors) iconKey += "Error";

  return (
    <RN.Pressable
      className="w-12 h-12 left-3 items-center justify-center mr-4"
      {...rest}
    >
      {myIcons[iconKey]}
    </RN.Pressable>
  );
};

export default InputPasswordIcon;
