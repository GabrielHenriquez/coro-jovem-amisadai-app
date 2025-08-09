import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@styles/colors";
import { useCallback, useMemo, useRef, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useDebounce } from "use-debounce";
import Toast from "@components/Toast/view";
import MemberCard from "../components/MemberCard";
import MemberPreview from "../components/MemberPreview";
import useMembers from "../hooks/useMembers";
import * as Component from "@components/index";
import * as RN from "react-native";
import { useQueryClient } from "@tanstack/react-query";

const Members = () => {
  const scrollY = useRef(new RN.Animated.Value(0)).current;
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 450);
  const flatListRef = useRef<RN.FlatList>(null);
  const scrollYRef = useRef(0);
  const {
    data,
    handleGetMember,
    bottomSheetModalRef,
    memberSelected,
    visibleToast,
    setVisibleToast,
    handleDeleteMember,
  } = useMembers();

  const scrollToTop = () => {
    RN.Animated.timing(scrollY, {
      toValue: 0,
      duration: 550,
      useNativeDriver: true,
    }).start(() => {
      flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
    });
  };

  const handleScroll = (event: any) => {
    scrollYRef.current = event.nativeEvent.contentOffset.y;
  };

  const filteredMembers = useMemo(() => {
    if (!data) return [];

    if (!debouncedSearchTerm?.trim()) return data;

    const filter = data.filter((item) =>
      item.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );

    return filter;
  }, [data, debouncedSearchTerm]);

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
        <RN.View className="gap-4 px-4">
          <Component.Text
            className="text-center font-poppinsBold text-primary"
            size={24}
          >
            Componentes
          </Component.Text>

          <Component.SearchInput
            styleRest={{ paddingHorizontal: 16 }}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />

          <Component.Text className="text-center font-poppinsSemiBold text-gray">
            {searchTerm && filteredMembers?.length === 0
              ? "Nenhum componente encontrado"
              : `Quantidade de componentes: ${filteredMembers?.length}`}
          </Component.Text>
        </RN.View>

        <Component.Spacer height={10} />

        <RN.FlatList
          data={filteredMembers}
          ref={flatListRef}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <MemberCard member={item} onPress={handleGetMember} />
          )}
          contentContainerClassName="gap-2.5 pb-16 px-6 mt-2"
          keyboardShouldPersistTaps="handled"
          decelerationRate={0.87}
        />

        <Component.BaseBottomSheet
          ref={bottomSheetModalRef}
          indicatorColor={
            memberSelected?.gender === "Masculino" ? "blueGender" : "pinkGender"
          }
        >
          <MemberPreview
            memberPressed={memberSelected}
            handleDeleteMember={handleDeleteMember}
          />
        </Component.BaseBottomSheet>
      </RN.View>
      <Toast
        message="Componente excluído com sucesso!"
        onHide={() => setVisibleToast(false)}
        visible={visibleToast}
      />
    </SafeAreaView>
  );
};

export default Members;
