import { Control, useController } from "react-hook-form";
import { colors } from "@styles/colors";
import { responsiveSize } from "@utils/index";
import * as RN from "react-native";

interface InputProps extends RN.TextInputProps {
  control?: Control<any>;
  isActivePassword?: boolean;
  name: string;
  isRegistrationField?: boolean;
}

const TextInput = ({
  control,
  name,
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
        allowFontScaling={false}
        value={field.value}
        onChangeText={handleTextChange}
        secureTextEntry={isActivePassword}
        placeholderTextColor={colors.gray}
        textAlignVertical="center"
        style={{
          fontSize: responsiveSize(14),
          paddingHorizontal: 10,
        }}
        className="flex-1 h-12 font-poppinsSemiBold text-black py-0 pt-1.5"
      />
    );
  }
};

export default TextInput;
