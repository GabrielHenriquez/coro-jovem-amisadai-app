import * as RN from "react-native";
import { Button, Dropdown, Header, Input, Text } from "@components/index";
import { colors } from "@styles/colors";
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";
import {
  CalendarDaysIcon,
  Camera,
  Flame,
  IdCard,
  LocationEdit,
  Mars,
  MicIcon,
  Phone,
  User,
} from "lucide-react-native";
import useFormRegisterMember from "../hooks/forms/useFormRegisterMember";
import { useEffect, useState, useCallback, useRef } from "react";
import { UploadProfilePhoto } from "@assets/images";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import axios from "axios";
import { useDebounce } from "use-debounce";
import useRegisterMember from "../hooks/useRegisterMember";
import { IMember } from "../domain/entities/Member";

export type GenderValue = "Masculino" | "Feminino" | null;
export type VoiceValue =
  | "Contralto"
  | "1º Soprano"
  | "2º Soprano"
  | "Baixo"
  | "Barítono"
  | "1º Tenor"
  | "2º Tenor"
  | null;
export type BaptizedValue = "Sim" | "Não" | null;

interface RouteParams {
  member?: IMember;
}

const MALE_VOICES: VoiceValue[] = ["Baixo", "Barítono", "1º Tenor", "2º Tenor"];
const FEMALE_VOICES: VoiceValue[] = ["Contralto", "1º Soprano", "2º Soprano"];
const GENDERS: ("Masculino" | "Feminino")[] = ["Masculino", "Feminino"];
const BAPTIZED_OPTIONS: ("Sim" | "Não")[] = ["Sim", "Não"];

const handleGetAddressByZipCode = async (zipCode: string) => {
  try {
    const response = await axios.get(
      `https://viacep.com.br/ws/${zipCode}/json/`
    );
    const { logradouro, uf, bairro, localidade } = response?.data;
    return { logradouro, uf, bairro, localidade };
  } catch (error) {
    console.log("Erro ao buscar CEP");
    return null;
  }
};

const ProfileImageSection: React.FC<{
  profileImage: string;
  onPress: () => void;
}> = ({ profileImage, onPress }) => (
  <RN.TouchableOpacity
    className="w-32 h-32 self-center mt-10"
    onPress={onPress}
  >
    <RN.View
      style={{
        borderRadius: profileImage ? 72 : 0,
        overflow: "hidden",
        position: "relative",
      }}
    >
      {!profileImage ? (
        <RN.Image
          source={UploadProfilePhoto as RN.ImageSourcePropType}
          style={{
            width: "100%",
            height: "100%",
          }}
          resizeMode="cover"
        />
      ) : (
        <RN.Image
          source={{ uri: profileImage }}
          style={{
            width: "100%",
            height: "100%",
          }}
          resizeMode="cover"
        />
      )}

      {profileImage && (
        <RN.View
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: 40,
            backgroundColor: "#ffffff42",
            justifyContent: "center",
            alignItems: "center",
            borderBottomLeftRadius: 72,
            borderBottomRightRadius: 72,
          }}
        >
          <Camera color={"#ffffff"} />
        </RN.View>
      )}
    </RN.View>
  </RN.TouchableOpacity>
);

const PersonalInfoSection: React.FC<{
  form: any;
  errors: any;
  suitData: VoiceValue[];
}> = ({ form, errors, suitData }) => (
  <RN.View className="gap-5">
    <Input.Root>
      <Input.Content
        icon={<User size={25} strokeWidth={2.5} color={"#FFFFFF"} />}
        errors={errors.name!}
      >
        <Input.TextInput
          name="name"
          control={form.control}
          placeholder="Nome"
          autoCapitalize="words"
        />
      </Input.Content>
    </Input.Root>

    <Input.Root>
      <Input.Content
        icon={<Phone size={23} strokeWidth={2.5} color={"#FFFFFF"} />}
        errors={errors.phone!}
      >
        <Input.TextInputMask
          name="phone"
          control={form.control}
          placeholder="Telefone"
          type="cel-phone"
          keyboardType="numeric"
          maxLength={15}
        />
      </Input.Content>
    </Input.Root>

    <Input.Root>
      <Input.Content
        icon={
          <CalendarDaysIcon strokeWidth={2.5} size={23} color={"#FFFFFF"} />
        }
        errors={errors?.birthDate!}
      >
        <Input.TextInputMask
          name="birthDate"
          type="custom"
          maxLength={10}
          options={{
            mask: "99/99/9999",
          }}
          control={form.control}
          placeholder="Data de nascimento"
          keyboardType="numeric"
        />
      </Input.Content>
    </Input.Root>

    <Dropdown
      name="gender"
      control={form.control}
      error={errors.gender!}
      data={GENDERS}
      colorsIndicator={["#4167C5", "#C54186"]}
      placeholder="Selecione um genêro"
      icon={<Mars strokeWidth={2.5} color={"#FFF"} size={23} />}
    />

    <Dropdown
      name="baptized"
      control={form.control}
      error={errors.baptized!}
      data={BAPTIZED_OPTIONS}
      placeholder="Batizado no espiríto santo?"
      icon={<Flame strokeWidth={2.5} color={"#FFF"} size={24} />}
    />

    <Input.Root>
      <Input.Content
        icon={<IdCard strokeWidth={2} size={28} color={"#FFFFFF"} />}
        errors={errors?.memberCard!}
      >
        <Input.TextInputMask
          name="memberCard"
          control={form.control}
          placeholder="Nº do cartão de membro"
          keyboardType="numeric"
          type="custom"
          maxLength={9}
          options={{
            mask: "999999999",
          }}
        />
      </Input.Content>
    </Input.Root>

    <Dropdown
      name="suit"
      control={form.control}
      error={errors.suit!}
      placeholder="Selecione um naipe"
      data={suitData.filter(
        (item): item is NonNullable<VoiceValue> => item !== null
      )}
      icon={<MicIcon strokeWidth={2.5} color={"#FFF"} size={23} />}
    />
  </RN.View>
);

const AddressSection: React.FC<{
  form: any;
  errors: any;
}> = ({ form, errors }) => (
  <RN.View className="gap-5">
    <Input.Root>
      <Input.Content
        icon={<LocationEdit strokeWidth={2} size={28} color={"#FFFFFF"} />}
        errors={errors?.zipCode!}
      >
        <Input.TextInputMask
          control={form.control}
          name="zipCode"
          placeholder="CEP"
          type="custom"
          maxLength={9}
          keyboardType="numeric"
          options={{ mask: "99999-999" }}
        />
      </Input.Content>
    </Input.Root>

    <Input.Root>
      <Input.Content
        icon={<LocationEdit strokeWidth={2} size={28} color={"#FFFFFF"} />}
        errors={errors.street!}
      >
        <Input.TextInput
          name="street"
          control={form.control}
          placeholder="Rua"
          autoCapitalize="words"
        />
      </Input.Content>
    </Input.Root>

    <Input.Root>
      <Input.Content
        icon={<LocationEdit strokeWidth={2} size={28} color={"#FFFFFF"} />}
        errors={errors.neighborhood!}
      >
        <Input.TextInput
          name="neighborhood"
          control={form.control}
          placeholder="Bairro"
          autoCapitalize="words"
        />
      </Input.Content>
    </Input.Root>

    <RN.View style={{ flexDirection: "row", gap: 10 }}>
      <Input.Content
        style={{ flex: 0.55 }}
        icon={<LocationEdit strokeWidth={2} size={28} color={"#FFFFFF"} />}
        errors={errors?.number!}
      >
        <Input.TextInput
          control={form.control}
          name="number"
          placeholder="Nº"
          keyboardType="numeric"
          maxLength={4}
        />
      </Input.Content>

      <Input.Content style={{ flex: 1 }} errors={errors?.complement!}>
        <Input.TextInput
          control={form.control}
          name="complement"
          placeholder="Complemento (Opcional)"
        />
      </Input.Content>
    </RN.View>
  </RN.View>
);

const RegisterMemberScreen = () => {
  const { goBack } = useNavigation();
  const route = useRoute();
  const member = (route.params as RouteParams)?.member;
  const [dataToDropdownSuit, setDataToDropdownSuit] =
    useState<VoiceValue[]>(MALE_VOICES);
  const FORM = useFormRegisterMember();
  const VM = useRegisterMember({ isEdit: member?.id || "" });
  const scrollViewRef = useRef<any>(null);

  const watchedZipCode = FORM.watch("zipCode");
  const watchedGender = FORM.watch("gender");
  const [debouncedZipCode] = useDebounce(watchedZipCode, 350);

  useEffect(() => {
    const isGenderMale = watchedGender === "Masculino";
    isGenderMale
      ? setDataToDropdownSuit(MALE_VOICES)
      : setDataToDropdownSuit(FEMALE_VOICES);
  }, [watchedGender]);

  useEffect(() => {
    const fetchAddress = async () => {
      if (debouncedZipCode?.length === 9) {
        const address = await handleGetAddressByZipCode(debouncedZipCode);
        if (address) {
          FORM.setValue("street", address.logradouro, {
            shouldValidate: true,
          });
          FORM.setValue("neighborhood", address.bairro, {
            shouldValidate: true,
          });
          FORM.setValue("city", address.localidade, { shouldValidate: true });
          FORM.setValue("uf", address.uf, { shouldValidate: true });
        }
      }
    };

    fetchAddress();
  }, [debouncedZipCode]);

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

        const isGenderMale = member?.gender === "Masculino";
        setDataToDropdownSuit(isGenderMale ? MALE_VOICES : FEMALE_VOICES);
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
            suitData={dataToDropdownSuit}
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
