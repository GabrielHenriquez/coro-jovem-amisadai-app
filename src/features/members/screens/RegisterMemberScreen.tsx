import * as RN from "react-native";
import { Button, Header, Text } from "@components/index";
import { colors } from "@styles/colors";
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";
import useFormRegisterMember from "../hooks/forms/useFormRegisterMember";
import { useCallback, useRef } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import useRegisterMember from "../hooks/useRegisterMember";
import { IMember } from "../domain/entities/Member";
import {
  ProfileImageSection,
  PersonalInfoSection,
  AddressSection,
} from "../components";
import { useSuitData } from "../hooks/useSuitData";
import { useAddressByZipCode } from "../hooks/useAddressByZipCode";

interface RouteParams {
  member?: IMember;
}

const RegisterMemberScreen = () => {
  const { goBack } = useNavigation();
  const route = useRoute();
  const member = (route.params as RouteParams)?.member;
  const FORM = useFormRegisterMember();
  const VM = useRegisterMember({ isEdit: member?.id || "" });
  const scrollViewRef = useRef<any>(null);

  const watchedZipCode = FORM.watch("zipCode");
  const watchedGender = FORM.watch("gender");

  const suitData = useSuitData(watchedGender);
  useAddressByZipCode({ zipCode: watchedZipCode, setValue: FORM.setValue });

  const handleSubmit = useCallback(
    (data: any) => {
      VM.onSubmit(data);
    },
    [VM.onSubmit]
  );

  useFocusEffect(
    useCallback(() => {
      if (!member) {
        FORM.reset();
        VM.setProfileImage("");
      } else {
        FORM.setValue("name", member?.name || "");
        FORM.setValue("phone", member?.phone || "");
        FORM.setValue("birthDate", member?.birthDate || "");
        FORM.setValue("gender", member?.gender || "");
        FORM.setValue("baptized", member?.baptized || "");
        FORM.setValue("memberCard", member?.memberCard || "");
        FORM.setValue("suit", member?.suit || "");
        FORM.setValue("zipCode", member?.zipCode || "");
        FORM.setValue("number", member?.number || "");
        FORM.setValue("complement", member?.complement || "");
        VM.setProfileImage(member?.profileImageUri || "");
      }

      setTimeout(() => {
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollTo?.({ y: 0, animated: true });
        }
      }, 100);
    }, [member])
  );

  return (
    <RN.View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header
        bgColor="primary"
        onPressBack={goBack}
        color="white"
        title={member?.id ? "Editar componente" : "Cadastrar componente"}
      />

      <KeyboardAwareScrollView
        ref={scrollViewRef}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 50,
          paddingHorizontal: 20,
        }}
        keyboardShouldPersistTaps="handled"
        bottomOffset={50}
      >
        <ProfileImageSection
          profileImage={VM.profileImage}
          onPress={VM.openImagePickerAsync}
        />

        <RN.View className="gap-5 my-11">
          <PersonalInfoSection
            form={FORM}
            errors={FORM.errors}
            suitData={suitData}
          />
          <AddressSection form={FORM} errors={FORM.errors} />
        </RN.View>

        <Button
          onPress={FORM.handleSubmit(handleSubmit)}
          activeLoading={VM?.isLoading}
        >
          <Text className="font-poppinsSemiBold text-white">
            {member?.id ? "Editar" : "Cadastrar"}
          </Text>
        </Button>
      </KeyboardAwareScrollView>
    </RN.View>
  );
};

export default RegisterMemberScreen;
