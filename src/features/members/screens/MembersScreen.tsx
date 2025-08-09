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
import { useMemberStore } from "../stores/membersStore";
import { IMember } from "../domain/entities/Member";
import ScrollToTopButton from "../components/ScrollTopTopButton";

// Constants
const SCROLL_THRESHOLD = 400;

const Members = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 450);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const flatListRef = useRef<RN.FlatList>(null);
  const scrollYRef = useRef(0);

  const {
    data,
    handleGetMember,
    bottomSheetModalRef,
    memberSelected,
    handleDeleteMember,
  } = useMembers();
  const { getLabelToast, visibleToast, setVisibleToast } = useMemberStore();

  /**
   * Scrolls the FlatList to the top with animation
   */
  const scrollToTop = useCallback(() => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  }, []);

  /**
   * Handles scroll events and shows/hides the scroll to top button
   */
  const handleScroll = useCallback(
    (event: RN.NativeSyntheticEvent<RN.NativeScrollEvent>) => {
      const currentScrollY = event.nativeEvent.contentOffset.y;
      scrollYRef.current = currentScrollY;

      const shouldShowButton = currentScrollY > SCROLL_THRESHOLD;

      setShowScrollToTop(shouldShowButton);
    },
    []
  );

  /**
   * Filters members based on search term
   */
  const filteredMembers = useMemo(() => {
    if (!data) return [];

    if (!debouncedSearchTerm?.trim()) return data as IMember[];

    return (data as IMember[]).filter((item: IMember) =>
      item.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  }, [data, debouncedSearchTerm]);

  useFocusEffect(useCallback(() => scrollToTop(), [scrollToTop]));

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
            <MemberCard
              member={item}
              onPress={() => handleGetMember(item.id)}
            />
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
          {memberSelected && (
            <MemberPreview
              memberPressed={memberSelected}
              handleDeleteMember={handleDeleteMember}
            />
          )}
        </Component.BaseBottomSheet>
      </RN.View>

      {showScrollToTop && <ScrollToTopButton onPress={scrollToTop} />}

      <Toast
        message={`Componente ${getLabelToast()} com sucesso!`}
        onHide={() => setVisibleToast(false)}
        visible={visibleToast}
      />
    </SafeAreaView>
  );
};

export default Members;
