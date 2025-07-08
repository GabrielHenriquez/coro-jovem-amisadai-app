import React from "react";
import { Control, FieldError, useController } from "react-hook-form";
import { colors } from "@styles/colors";
import { responsiveSize } from "@utils/responsiveSize";
import * as RN from "react-native";

interface InputProps extends RN.TextInputProps {
  control?: Control<any>;
  errors?: FieldError;
  isActivePassword?: boolean;
  name: string;
  isRegistrationField?: boolean;
}

const TextInput = ({
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
    const handleTextChange = (text: string) => {
      let formattedText = text;
      if (isRegistrationField) formattedText = text.replace(/[^Z0-9]/g, "");
      field.onChange(formattedText);
    };

    return (
      <RN.TextInput
        {...rest}
        value={field.value}
        onChangeText={handleTextChange}
        secureTextEntry={isActivePassword}
        placeholderTextColor={colors.gray}
        textAlignVertical="center"
        style={{
          fontSize: responsiveSize(16),
          paddingHorizontal: 12,
        }}
        className="flex-1 h-12 font-poppinsMedium text-black py-0 pt-1.5"
      />
    );
  }
};

export default TextInput;
