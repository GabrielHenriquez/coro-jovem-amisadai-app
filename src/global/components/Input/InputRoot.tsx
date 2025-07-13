import React, { ReactNode } from "react";
import { View } from "react-native";

type InputRootProps = {
  children: ReactNode;
};

const InputRoot = ({ children }: InputRootProps) => (
  <View className="w-full">{children}</View>
);

export default InputRoot;
