import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@styles/colors";
import { useCallback, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useToastMemberStore } from "../stores/toastMemberStore";
import { IMember } from "../domain/entities/Member";
import Toast from "@components/Toast/view";
import MemberPreview from "../components/MemberPreview";
import useMembers from "../hooks/useMembers";
import ScrollToTopButton from "../components/ScrollTopTopButton";
import * as Component from "@components/index";
import * as RN from "react-native";

import { useScrollToTop } from "../hooks/useScrollToTop";
import { useImagePreload } from "../hooks/useImagePreload";
import { useMemberSearch } from "../hooks/useMemberSearch";
import { useDeleteConfirmation } from "../hooks/useDeleteConfirmation";

import MembersHeader from "../components/MembersHeader";

import MembersList from "../components/MembersList";
import MembersListShimmer from "../components/MembersListShimmer";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";

const Members = () => {
  const {
    data,
    isSuccess,
    handleGetMember,
    bottomSheetModalRef,
    memberSelected,
    handleDeleteMember,
  } = useMembers();

  const { getLabelToast, visibleToast, setVisibleToast } =
    useToastMemberStore();

  const {
    showScrollToTop,
    flatListRef,
    scrollToTop,
    handleScroll,
    resetScrollPosition,
    forceScrollToTop,
  } = useScrollToTop();

  const { fastImageLoaded } = useImagePreload(data as IMember[], isSuccess);

  const { searchTerm, setSearchTerm, filteredMembers, resetSearch } =
    useMemberSearch(data as IMember[]);

  const { hasMemberToDelete, openDeleteConfirmation, closeDeleteConfirmation } =
    useDeleteConfirmation();

  useFocusEffect(useCallback(() => resetScrollPosition(), []));
  useFocusEffect(useCallback(() => resetSearch(), [resetSearch]));

  useEffect(() => {
    const hasMembers = filteredMembers.length > 0;
    const isSearchEmpty = searchTerm === "";
    if (isSearchEmpty && hasMembers) forceScrollToTop();
  }, [searchTerm, filteredMembers.length, forceScrollToTop]);

  const handleDeleteConfirm = useCallback(
    (member: IMember) => {
      handleDeleteMember(member);
    },
    [handleDeleteMember]
  );

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
        <MembersHeader
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filteredMembersCount={filteredMembers.length}
        />

        <Component.Spacer height={10} />

        {fastImageLoaded ? (
          <MembersList
            data={filteredMembers}
            onMemberPress={handleGetMember}
            flatListRef={flatListRef}
            onScroll={handleScroll}
          />
        ) : (
          <MembersListShimmer itemCount={8} />
        )}

        <Component.BaseBottomSheet
          ref={bottomSheetModalRef}
          indicatorColor={
            memberSelected?.gender === "Masculino" ? "blueGender" : "pinkGender"
          }
        >
          {memberSelected && (
            <MemberPreview
              memberPressed={memberSelected}
              handleDeleteMember={openDeleteConfirmation}
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

      <DeleteConfirmationModal
        visible={!!hasMemberToDelete}
        memberToDelete={hasMemberToDelete}
        onClose={closeDeleteConfirmation}
        onConfirm={handleDeleteConfirm}
      />
    </SafeAreaView>
  );
};

export default Members;
