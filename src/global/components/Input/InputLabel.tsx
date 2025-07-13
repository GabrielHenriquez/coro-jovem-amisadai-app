import React from "react";
import Text from "@components/Text";
import { View } from "react-native";
import { colors } from "@styles/colors";

type InputLabelProps = {
  fieldRequired?: boolean;
  label?: string;
  errors?: boolean;
};

const InputLabel = ({
  fieldRequired,
  label,
  errors = false,
}: InputLabelProps) => (
  <>
    <View style={{ flexDirection: "row", marginBottom: 7 }}>
      {fieldRequired && <Text className="color-redDark text-sm">*</Text>}
      <Text
        className="font-semibold"
        style={{ color: errors ? colors.redDark : colors.black }}
      >
        {label}
      </Text>
    </View>
  </>
);

export default InputLabel;
