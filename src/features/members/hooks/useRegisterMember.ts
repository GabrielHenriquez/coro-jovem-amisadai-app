import { Keyboard } from "react-native";
import { FirebaseMembersRepository } from "../domain/repositories/FirebaseMembersRepository";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useCallback, useRef } from "react";
import { FormDataRegisterMember } from "./forms/useFormRegisterMember";
import { storage } from "global/configs/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { useToastMemberStore } from "../stores/toastMemberStore";
import { useBirthdayEvents } from "../../calls/hooks/useBirthdayEvents";
import { Log } from "global/services/Logger";

type MemberDataWithId = FormDataRegisterMember & {
  id?: string;
  profileImageUri?: string;
};

const useRegisterMember = ({ isEdit }: { isEdit: string }) => {
  const repository = new FirebaseMembersRepository();
  const queryClient = useQueryClient();
  const [profileImage, setProfileImage] = useState("");
  const { setVisibleToast } = useToastMemberStore();
  const { goBack } = useNavigation();
  const { createOrUpdateBirthdayEvent, cleanup } = useBirthdayEvents();

  const operationInProgress = useRef(false);

  const openImagePickerAsync = useCallback(async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        quality: 0.3,
      });

      if (result && !result.canceled && result.assets) {
        setProfileImage(result.assets[0].uri);
      }
    } catch (error) {
      Log.error("Erro ao abrir seletor de imagem:", error);
    }
  }, []);

  const uploadImageStorage = useCallback(
    async (name: string, memberCard: string) => {
      if (!profileImage) return "";

      try {
        const response = await fetch(profileImage);
        const blob = await response.blob();
        const imageRef = ref(
          storage,
          `component-${name}-${memberCard}/profileImage`
        );

        const uploadTask = await uploadBytes(imageRef, blob);
        const uri = await getDownloadURL(uploadTask.ref);
        return uri;
      } catch (error: any) {
        Log.error("Erro no upload de imagem", error);
        return "";
      }
    },
    [profileImage]
  );

  const createMemberMutation = useMutation({
    mutationFn: async (data: FormDataRegisterMember) => {
      if (operationInProgress.current)
        throw new Error("Operação já em andamento");

      operationInProgress.current = true;

      try {
        let uri = "";
        if (profileImage)
          uri = await uploadImageStorage(data?.name, data?.memberCard);

        const memberData: MemberDataWithId = {
          ...data,
          profileImageUri: uri,
        };

        let result;
        if (isEdit) {
          memberData.id = isEdit;
          await repository.updateMember(memberData);
          result = { id: isEdit };
        } else {
          await repository.createMember(memberData);
          result = { id: `${data.name}-${data.memberCard}` };
        }

        if (data.birthDate) {
          Promise.resolve().then(async () => {
            try {
              await createOrUpdateBirthdayEvent({
                id: result.id,
                name: data.name,
                birthDate: data.birthDate,
                gender: data.gender,
                profileImage: uri,
              });
            } catch (error) {
              Log.error("Erro ao criar evento de aniversário:", error);
            }
          });
        }

        return result;
      } finally {
        operationInProgress.current = false;
      }
    },
    onSuccess: () => {
      const action = isEdit ? "edit" : "create";

      Promise.all([
        queryClient.invalidateQueries({ queryKey: ["members"] }),
        queryClient.invalidateQueries({ queryKey: ["birthDates"] }),
        queryClient.invalidateQueries({ queryKey: ["dots"] }),
      ]).catch(console.error);

      Log.success(
        isEdit ? "Membro editado com sucesso!" : "Membro criado com sucesso!"
      );

      goBack();
      setVisibleToast(true, action);
    },
    onError: (erro) => {
      Log.error("[MutationRegister] ->", erro);
      operationInProgress.current = false;
    },
  });

  const onSubmit = useCallback(
    (dataForm: FormDataRegisterMember) => {
      Keyboard.dismiss();
      createMemberMutation.mutate(dataForm);
    },
    [createMemberMutation]
  );

  const cleanupOnUnmount = useCallback(() => {
    cleanup();
    operationInProgress.current = false;
  }, [cleanup]);

  return {
    onSubmit,
    setProfileImage,
    openImagePickerAsync,
    profileImage,
    isLoading: createMemberMutation?.isPending,
    isOperationInProgress: operationInProgress.current,
    cleanupOnUnmount,
  };
};

export default useRegisterMember;
