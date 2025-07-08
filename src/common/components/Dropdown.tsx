import Text from "./Text";
import { useState, useRef, Dispatch, SetStateAction, ReactNode } from "react";
import { Ionicons } from "@expo/vector-icons";
import { responsiveSize } from "@utils/responsiveSize";
import { colors } from "@styles/colors";
import * as RN from "react-native";
import heightWindow from "@utils/getHeight";
import height from "@utils/getHeight";
export interface FlatListItem {
  key: "Secretário(a)" | "Dirigente" | "Vice-secretário";
  value: string;
}
interface IProps {
  data: FlatListItem[];
  selected: FlatListItem | null;
  setSelected: Dispatch<SetStateAction<FlatListItem | null>>;
  icon?: ReactNode;
}

export default function AnimatedDropdown({
  data,
  icon,
  selected,
  setSelected,
}: IProps) {
  const [expanded, setExpanded] = useState(false);
  const [dropdownHeight, setDropdownHeight] = useState(50);
  const animation = useRef(new RN.Animated.Value(0)).current;

  const borderToDropdownContentExpanded: RN.ViewStyle = expanded
    ? { borderWidth: 1, borderColor: colors.gray3, elevation: 1 }
    : {};

  function toggleDropdown() {
    RN.Keyboard.dismiss();
    const toValue = expanded ? 0 : 1;

    RN.Animated.timing(animation, {
      toValue,
      duration: 250,
      useNativeDriver: false,
    }).start();

    setExpanded(!expanded);
  }

  const height = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [
      0,
      data?.length < 4 ? data?.length * responsiveSize(40) : 160,
    ],
  });

  const rotate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const label = selected ? selected.value : "Selecione um cargo";
  const hasSelectedStyle = selected
    ? "font-poppinsMedium text-black pt-1.5"
    : "font-poppinsMedium text-gray pt-1.5";

  return (
    <RN.View style={styles.container}>
      <RN.Pressable
        onLayout={(event) => {
          const { height } = event.nativeEvent.layout;
          setDropdownHeight(height + 10);
        }}
        onPress={toggleDropdown}
        style={styles.dropdown}
      >
        <RN.View
          style={{
            height: heightWindow * 0.0605,
            right: 1,
          }}
          className="w-16 bg-primary rounded-l-xl justify-center items-center"
        >
          {icon}
        </RN.View>
        <RN.View className="flex-row items-center justify-between px-3 flex-1">
          <Text className={hasSelectedStyle}>{label}</Text>
          <RN.Animated.View style={{ transform: [{ rotate }] }}>
            <Ionicons
              name="chevron-down-outline"
              size={26}
              color={colors.primary}
            />
          </RN.Animated.View>
        </RN.View>
      </RN.Pressable>

      <RN.Animated.View
        style={[
          styles.dropdownContent,
          {
            height,
            top: dropdownHeight,
            ...borderToDropdownContentExpanded,
          },
        ]}
      >
        <RN.FlatList
          data={data}
          scrollEnabled={false}
          keyExtractor={(item: FlatListItem) => item.key}
          renderItem={({ item }) => {
            const isSelected = item.key === selected?.key;
            return (
              <RN.TouchableOpacity
                style={[styles.option, isSelected && styles.selectedOption]}
                onPress={() => {
                  setSelected(item);
                  toggleDropdown();
                }}
              >
                <Text className="font-poppinsSemiBold text-black pt-1.5">
                  {item.value}
                </Text>
              </RN.TouchableOpacity>
            );
          }}
        />
      </RN.Animated.View>
    </RN.View>
  );
}

const styles = RN.StyleSheet.create({
  container: {
    width: "100%",
  },
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray3,
    elevation: 1,
    borderRadius: 12,
    height: height * 0.06,
  },
  selectedOption: {
    backgroundColor: colors.gray2,
  },
  dropdownContent: {
    position: "absolute",
    left: 0,
    right: 0,
    overflow: "hidden",
    backgroundColor: "#fffffff4",
    borderRadius: 8,
    zIndex: 1000,
  },
  option: {
    height: responsiveSize(40),
    paddingHorizontal: 14,
    justifyContent: "center",
    borderBottomWidth: 0.5,
    borderColor: colors.gray,
  },
});
