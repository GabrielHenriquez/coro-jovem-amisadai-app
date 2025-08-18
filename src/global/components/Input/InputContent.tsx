import { ReactNode } from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import { colors } from "@styles/colors";
import * as RN from "react-native";
import Text from "@components/Text";
import height from "global/constants/height";

interface InputContentProps extends RN.ViewProps {
  children: ReactNode;
  errors: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  icon?: ReactNode;
  size?: number;
}

const InputContent = ({
  children,
  errors,
  size = 0.052,
  icon,
  ...rest
}: InputContentProps) => {
  return (
    <RN.View className="w-full" {...rest}>
      <RN.View
        className="w-full bg-white flex-row items-center rounded-xl"
        style={{
          height: height * size,
          borderWidth: 1,
          borderColor: !!errors ? colors.redDark : colors.grayLight,
          elevation: 1,
        }}
      >
        {icon && (
          <RN.View
            style={{
              height: height * size + 0.001,
              right: 1,
            }}
            className="w-16 bg-primary rounded-l-xl justify-center items-center"
          >
            {icon}
          </RN.View>
        )}

        {children}
      </RN.View>
      {errors && (
        <Text size={12} className="text-redDark font-poppinsSemiBold pt-1 pl-1">
          {String(errors?.message)}
        </Text>
      )}
    </RN.View>
  );
};

export default InputContent;
