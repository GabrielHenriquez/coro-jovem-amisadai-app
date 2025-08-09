import { Keyboard } from "react-native";
import { FirebaseMembersRepository } from "../domain/repositories/FirebaseMembersRepository";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { FormDataRegisterMember } from "./forms/useFormRegisterMember";
import { storage } from "global/configs/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { useMemberStore } from "../stores/membersStore";

const useRegisterMember = ({ isEdit }: { isEdit: string }) => {
  const repository = new FirebaseMembersRepository();
  const queryClient = useQueryClient();
  const [profileImage, setProfileImage] = useState("");
  const { setVisibleToast } = useMemberStore();
  const { goBack } = useNavigation();

  const openImagePickerAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 0.3,
    });

    if (result && !result.canceled && result.assets) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const uploadImageStorage = async (name: string, memberCard: string) => {
    const response = await fetch(profileImage);
    const blob = await response.blob();
    const imageRef = ref(
      storage,
      `component-${name}-${memberCard}/profileImage`
    );

    try {
      const uploadTask = await uploadBytes(imageRef, blob);
      const uri = await getDownloadURL(uploadTask.ref);
      return uri;
    } catch (error: any) {
      console.log("Erro no upload de imagem", error);
      return "";
    }
  };

  const createMemberMutation = useMutation({
    mutationFn: async (data: FormDataRegisterMember) => {
      let uri = "";
      if (profileImage)
        uri = await uploadImageStorage(data?.name, data?.memberCard);
      return isEdit
        ? repository.updateMember({ ...data, id: isEdit, profileImageUri: uri })
        : repository.createMember({ ...data, profileImageUri: uri });
    },
    onSuccess: () => {
      const action = isEdit ? "edit" : "create";
      queryClient.invalidateQueries({
        queryKey: ["members"],
      });
      console.log(
        isEdit
          ? "✅ Membro editado com sucesso!"
          : "✅ Membro criado com sucesso!"
      );
      goBack();
      setVisibleToast(true, action);
    },
    onError: (erro) => console.error("[MutationRegister] ->", erro),
  });

  const onSubmit = (dataForm: FormDataRegisterMember) => {
    Keyboard.dismiss();
    createMemberMutation.mutate(dataForm);
  };

  return {
    onSubmit,
    setProfileImage,
    openImagePickerAsync,
    profileImage,
    isLoading: createMemberMutation?.isPending,
  };
};

export default useRegisterMember;
