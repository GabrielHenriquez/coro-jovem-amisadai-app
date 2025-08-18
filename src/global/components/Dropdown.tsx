import Text from "./Text";
import { useState, useRef, ReactNode } from "react";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@styles/colors";
import { getHeight, responsiveSize } from "@utils/index";
import {
  BaptizedValue,
  GenderValue,
  VoiceValue,
} from "@features/members/domain/entities/MemberForm";
import * as RN from "react-native";
import {
  Control,
  FieldError,
  FieldErrorsImpl,
  Merge,
  useController,
} from "react-hook-form";
import { CallValue } from "@features/calls/components/CreateCallFormContent";
import { OfficeValue } from "@features/auth/components/RegisterContent";

export interface IDropdownValues {
  gender?: GenderValue | null;
  suit?: VoiceValue | null;
  baptized?: BaptizedValue | null;
  callType?: CallValue | null;
  office?: OfficeValue | null;
  month?: string | null;
}

interface IProps<T extends keyof IDropdownValues> {
  icon?: ReactNode;
  placeholder: string;
  error: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  colorsIndicator?: string[];
  data: Exclude<IDropdownValues[T], null>[];
  control?: Control<any>;
  name: T;
}

export default function AnimatedDropdown<T extends keyof IDropdownValues>({
  data,
  name,
  control,
  error,
  icon,
  placeholder,
  colorsIndicator,
}: IProps<T>) {
  const [expanded, setExpanded] = useState(false);
  const [dropdownHeight, setDropdownHeight] = useState(50);
  const animation = useRef(new RN.Animated.Value(0)).current;

  const borderToDropdownContentExpanded: RN.ViewStyle = expanded
    ? { borderWidth: 1, borderColor: colors.gray3, elevation: 1 }
    : {};

  const { field } = useController({
    control,
    name,
  });

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
      data?.length < 4
        ? data?.length * responsiveSize(42)
        : responsiveSize(168),
    ],
  });

  const rotate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const label = field.value ?? placeholder;
  const hasSelectedStyle = field.value
    ? "font-poppinsSemiBold text-black pt-1.5"
    : "font-poppinsSemiBold text-gray pt-1.5";

  return (
    <RN.View style={styles.container}>
      <RN.Pressable
        onPress={toggleDropdown}
        style={[styles.dropdown, error && styles.isError]}
        onLayout={(event) => {
          const { height } = event.nativeEvent.layout;
          setDropdownHeight(height + 6);
        }}
      >
        <RN.View
          style={{
            height: getHeight * 0.0521,
            right: 1,
          }}
          className="w-16 bg-primary rounded-l-xl justify-center items-center"
        >
          {icon}
        </RN.View>
        <RN.View className="flex-row items-center justify-between px-3 flex-1">
          <Text size={14} className={hasSelectedStyle}>
            {label}
          </Text>
          <RN.Animated.View style={{ transform: [{ rotate }] }}>
            <Ionicons
              size={26}
              color={colors.primary}
              name="chevron-down-outline"
            />
          </RN.Animated.View>
        </RN.View>
      </RN.Pressable>

      {error && (
        <Text size={12} className="text-redDark font-poppinsSemiBold pt-1 pl-1">
          {String(error?.message)}
        </Text>
      )}

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
          scrollEnabled={data.length > 4}
          keyExtractor={(item) => String(item)}
          renderItem={({ item, index }) => {
            const isSelected = item === field.value;
            return (
              <RN.TouchableOpacity
                style={[styles.option, isSelected && styles.selectedOption]}
                onPress={() => {
                  field.onChange(item);
                  toggleDropdown();
                }}
              >
                {colorsIndicator && (
                  <RN.View
                    style={{ backgroundColor: colorsIndicator[index] }}
                    className="w-4 h-7 rounded-xl"
                  />
                )}

                <Text size={14} className="font-poppinsSemiBold text-black">
                  {item}
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
  isError: {
    borderColor: colors.redDark,
  },
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray3,
    elevation: 1,
    borderRadius: 12,
    height: getHeight * 0.052,
  },
  selectedOption: {
    backgroundColor: "#e0e0e0",
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
    height: responsiveSize(42),
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderColor: colors.gray,
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
});
