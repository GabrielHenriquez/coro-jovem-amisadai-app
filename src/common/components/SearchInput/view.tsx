import { styles } from "./styles";
import { InputProps } from "./model";
import { Search, X } from "lucide-react-native";
import { colors } from "@styles/colors";
import * as RN from "react-native";

function SearchInput({
  searchTerm,
  styleRest,
  setSearchTerm,

  ...rest
}: InputProps) {
  return (
    <RN.View style={[styles.container, { ...styleRest }]}>
      <RN.View style={styles.contentInput}>
        <RN.View style={[styles.areaIcon, { marginRight: 0, marginLeft: 4 }]}>
          <Search color={colors.greenMedium} />
        </RN.View>

        <RN.TextInput
          value={searchTerm}
          placeholderTextColor={colors.gray}
          placeholder="Pesquisar"
          onChangeText={setSearchTerm}
          style={styles.textInput}
          {...rest}
        />
      </RN.View>
    </RN.View>
  );
}

export default SearchInput;
