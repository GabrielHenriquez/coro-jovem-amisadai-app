import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@styles/colors";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useCallback, useRef } from "react";
import { useFocusEffect } from "@react-navigation/native";
import MemberCard from "../components/MemberCard";
import MemberPreview from "../components/MemberPreview";
import * as Component from "@components/index";
import * as RN from "react-native";

const Members = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const scrollY = useRef(new RN.Animated.Value(0)).current;
  const flatListRef = useRef<RN.FlatList>(null);
  const scrollYRef = useRef(0);

  const scrollToTop = () => {
    RN.Animated.timing(scrollY, {
      toValue: 0,
      duration: 550,
      useNativeDriver: true,
    }).start(() => {
      flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
    });
  };

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleScroll = (event: any) => {
    scrollYRef.current = event.nativeEvent.contentOffset.y;
  };

  useFocusEffect(useCallback(() => scrollToTop(), []));

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary }}>
      <RN.StatusBar translucent backgroundColor="#4C5E46" />
      <Component.HeaderWithMenu styleRest={{ marginBottom: 10 }} />

      <RN.View
        style={{
          borderTopLeftRadius: 45,
          borderTopRightRadius: 45,
        }}
        className="flex-1 bg-background pt-4"
      >
        <RN.View className="gap-4">
          <Component.Text
            className="text-center font-poppinsBold text-primary"
            size={26}
          >
            Componentes
          </Component.Text>

          <Component.SearchInput
            styleRest={{ paddingHorizontal: 16 }}
            searchTerm={""}
            setSearchTerm={() => {}}
          />

          <Component.Text className="text-center font-poppinsSemiBold text-gray">
            Quantidade de componentes: 54
          </Component.Text>
        </RN.View>

        <Component.Spacer height={10} />

        <RN.FlatList
          ref={flatListRef}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          data={Array(54).fill(null)}
          renderItem={() => <MemberCard onPress={handlePresentModalPress} />}
          contentContainerClassName="gap-2.5 pb-16 px-6 mt-2"
          keyboardShouldPersistTaps="handled"
          decelerationRate={0.87}
        />

        <Component.BaseBottomSheet
          ref={bottomSheetModalRef}
          indicatorColor="blue"
        >
          <MemberPreview />
        </Component.BaseBottomSheet>
      </RN.View>
    </SafeAreaView>
  );
};

export default Members;
