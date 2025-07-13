import * as RN from "react-native";

export interface InputProps extends RN.TextInputProps {
  searchTerm: any;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  styleRest?: RN.ViewStyle;
}
