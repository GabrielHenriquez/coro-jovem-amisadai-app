import {
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetView,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import { colors, IColors } from "@styles/colors";
import { forwardRef, ReactNode } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export interface BaseBottomSheetProps extends BottomSheetModalProps {
  children: ReactNode;
  indicatorColor: IColors;
  withMorePaddingBottom?: boolean;
}

const BaseBottomSheet = forwardRef<BottomSheetModal, BaseBottomSheetProps>(
  ({ children, indicatorColor, withMorePaddingBottom = true, ...props }, ref) => {
    const { bottom } = useSafeAreaInsets();
    const { dismiss } = useBottomSheetModal();
    const paddingBottom = withMorePaddingBottom ? 30 : 0;

    return (
      <BottomSheetModal
        {...props}
        ref={ref}
        enablePanDownToClose
        enableDismissOnClose
        backgroundStyle={{
          backgroundColor: colors.white,
          borderTopLeftRadius: 45,
          borderTopRightRadius: 45,
          borderWidth: 1.5,
          elevation: 3,
          borderColor: colors.grayLight,
        }}
        backdropComponent={
          props.backdropComponent ??
          (({ style }) => (
            <Pressable
              onPress={() => dismiss()}
              style={[
                StyleSheet.absoluteFillObject,
                style,
                { backgroundColor: "rgba(7, 7, 7, 0.3)" },
              ]}
            />
          ))
        }
        handleIndicatorStyle={{
          backgroundColor: colors[indicatorColor],
          marginVertical: 8,
          marginBottom: 12,
          borderRadius: 12,
          width: 124,
          height: 18,
        }}
      >
        <BottomSheetView style={{ paddingBottom }}>
          {children}
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);
export default BaseBottomSheet;
