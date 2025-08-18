import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FirebaseMembersRepository } from "../domain/repositories/FirebaseMembersRepository";
import { MembersUseCase } from "../domain/usecases/MembersUseCase";
import { useCallback, useEffect, useRef, useState } from "react";
import { IMember } from "../domain/entities/Member";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useToastMemberStore } from "../stores/toastMemberStore";
import { Keyboard } from "react-native";
import { Log } from "@services/Logger";
import { useBirthdayNotifications } from "@hooks/index";

const membersRepo = new FirebaseMembersRepository();
const membersUseCase = new MembersUseCase(membersRepo);

const useMembers = () => {
  const [memberSelected, setMemberSelected] = useState<IMember | null>(null);
  const { setVisibleToast } = useToastMemberStore();
  const queryClient = useQueryClient();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const { scheduleAllNotifications } = useBirthdayNotifications();
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const queryGetMembers = useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const members = (await membersUseCase.execute("getMembers")) as IMember[];
      return members;
    },
  });

  const handleGetMember = async (id: string) => {
    const member = (await membersUseCase.execute("getMember", id)) as IMember;
    Log.success("Membro mostrado com sucesso:", member?.name);
    setMemberSelected(member);
  };

  const handleDeleteMember = async ({
    id,
    memberCard,
    name,
    profileImageUri,
  }: IMember) => {
    if (!id || !name || !memberCard || !profileImageUri) {
      console.error("Missing required fields for deletion");
      return;
    }

    await membersRepo.deleteMember({ memberCard, name, id, profileImageUri });
    bottomSheetModalRef.current?.close();
    queryClient.invalidateQueries({
      queryKey: ["members"],
    });
    setVisibleToast(true, "delete");
  };

  useEffect(() => {
    if (
      queryGetMembers.isSuccess &&
      queryGetMembers.data &&
      queryGetMembers.data.length > 0
    ) {
      Log.loading(
        `Membros carregados (${queryGetMembers.data.length}) - verificando notificações...`
      );

      scheduleAllNotifications(
        queryGetMembers.data.map((member) => ({
          id: member.id || "",
          name: member.name,
          birthDate: member.birthDate,
        }))
      );
    }
  }, [
    queryGetMembers.isSuccess,
    queryGetMembers.data,
    scheduleAllNotifications,
  ]);

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
    isSuccess: queryGetMembers.isSuccess,
    handleGetMember,
    memberSelected,
  };
};

export default useMembers;
