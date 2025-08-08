import React from "react";
import { Control, FieldError, useController } from "react-hook-form";
import { colors } from "@styles/colors";
import { responsiveSize } from "@utils/index";
import * as RNMasked from "react-native-masked-text";

interface InputProps extends RNMasked.TextInputMaskProps {
  control?: Control<any>;
  errors?: FieldError;
  isActivePassword?: boolean;
  name: string;
  isRegistrationField?: boolean;
}

const TextInputMask = ({
  control,
  name,
  errors,
  isActivePassword,
  isRegistrationField,
  ...rest
}: InputProps) => {
  const { field } = useController({
    control,
    name,
  });
  {
    return (
      <RNMasked.TextInputMask
        {...rest}
         allowFontScaling={false}
        value={field.value}
        onChangeText={field.onChange}
        secureTextEntry={isActivePassword}
        placeholderTextColor={colors.gray}
        textAlignVertical="center"
        style={{
          fontSize: responsiveSize(14),
          flex: 1,
          fontFamily: "Poppins_600SemiBold",
          height: 50,
          paddingHorizontal: 10,
          paddingVertical: 0,
          paddingTop: 6,
        }}
      />
    );
  }
};

export default TextInputMask;
