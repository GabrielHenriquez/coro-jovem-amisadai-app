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
          <Search color={colors.primary} size={22} strokeWidth={2.5} />
        </RN.View>

        <RN.TextInput
          value={searchTerm}
          placeholderTextColor={colors.gray}
          placeholder="Pesquisar"
          onChangeText={setSearchTerm}
          className="py-0"
          style={styles.textInput}
          {...rest}
        />

        {searchTerm && (
          <RN.TouchableOpacity
            className="px-2"
            onPress={() => {
              setSearchTerm("");
              RN.Keyboard.dismiss();
            }}
          >
            <X color={colors.grayMedium} />
          </RN.TouchableOpacity>
        )}
      </RN.View>
    </RN.View>
  );
}

export default SearchInput;
