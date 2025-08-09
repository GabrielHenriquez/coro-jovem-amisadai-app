import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FirebaseMembersRepository } from "../domain/repositories/FirebaseMembersRepository";
import { MembersUseCase } from "../domain/usecases/MembersUseCase";
import { useCallback, useEffect, useRef, useState } from "react";
import { IMember } from "../domain/entities/Member";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useMemberStore } from "../stores/membersStore";
import { Keyboard } from "react-native";

const membersRepo = new FirebaseMembersRepository();
const membersUseCase = new MembersUseCase(membersRepo);

const useMembers = () => {
  const [memberSelected, setMemberSelected] = useState<IMember | null>(null);
  const { setVisibleToast } = useMemberStore();
  const queryClient = useQueryClient();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const queryGetMembers = useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const members = await membersUseCase.execute("getMembers");
      console.log("✅ Membros obtidos com sucesso:", members.length);
      return members;
    },
  });

  const handleGetMember = async (id: string) => {
    const member = await membersUseCase.execute("getMember", id);
    console.log("✅ Membro mostrado com sucesso:", member?.name);
    setMemberSelected(member);
  };

  const handleDeleteMember = async ({
    id,
    memberCard,
    name,
    profileImageUri,
  }: IMember) => {
    await membersRepo.deleteMember({ memberCard, name, id, profileImageUri });
    bottomSheetModalRef.current?.close(), 1000;
    queryClient.invalidateQueries({
      queryKey: ["members"],
    });
    setVisibleToast(true, "delete");
  };

  useEffect(() => {
    if (memberSelected) {
      Keyboard.dismiss();
      handlePresentModalPress();
    }
  }, [memberSelected]);

  return {
    handleDeleteMember,
    bottomSheetModalRef,
    data: queryGetMembers.data,
    isLoading: queryGetMembers.isLoading,
    handleGetMember,
    memberSelected,
  };
};

export default useMembers;
