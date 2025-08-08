import * as RN from "react-native";
import { Button, Dropdown, Header, Input, Text } from "@components/index";
import { colors } from "@styles/colors";
import { useNavigation, useRoute } from "@react-navigation/native";
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
import { useEffect } from "react";
import { UploadProfilePhoto } from "@assets/images";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import axios from "axios";
import { useDebounce } from "use-debounce";
import useRegisterMember from "../hooks/useRegisterMember";
import Toast from "@components/Toast/view";

export type GenderValue = "Masculino" | "Feminino" | null;
export type VoiceValue =
  | "Contralto"
  | "1º Soprano"
  | "2º Soprano"
  | "Baixo"
  | "Tenor"
  | null;
export type BaptizedValue = "Sim" | "Não" | null;

const RegisterMemberScreen = () => {
  const { goBack } = useNavigation();
  const route = useRoute();
  const member = route?.params?.member;
  const FORM = useFormRegisterMember();
  const VM = useRegisterMember({ isEdit: member?.id });

  const handleGetAddressByZipCode = async (zipCode: string) => {
    try {
      const response = await axios.get(
        `https://viacep.com.br/ws/${zipCode}/json/`
      );
      const { logradouro, uf, bairro, localidade } = response?.data;
      return { logradouro, uf, bairro, localidade };
    } catch (error) {
      console.log("Erro ao buscar CEP");
    }
  };

  const watchedZipCode = FORM.watch("zipCode");
  const [debouncedZipCode] = useDebounce(watchedZipCode, 350);

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

  useEffect(() => {
    if (!member) {
      FORM.reset();
      VM.setProfileImage("");
    } else {
      FORM.setValue("name", member?.name);
      FORM.setValue("phone", member?.phone);
      FORM.setValue("birthDate", member?.birthDate);
      FORM.setValue("gender", member?.gender);
      FORM.setValue("baptized", member?.baptized);
      FORM.setValue("memberCard", member?.memberCard);
      FORM.setValue("suit", member?.suit);
      FORM.setValue("zipCode", member?.zipCode);
      FORM.setValue("number", member?.number);
      FORM.setValue("complement", member?.complement);
      VM.setProfileImage(member?.profileImageUri);
    }
  }, [member]);

  return (
    <RN.View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header
        bgColor="primary"
        onPressBack={goBack}
        color="white"
        title={member?.id ? "Editar componente" : "Cadastrar componente"}
      />

      <KeyboardAwareScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 50,
          paddingHorizontal: 20,
        }}
        keyboardShouldPersistTaps="handled"
        bottomOffset={50}
      >
        <RN.TouchableOpacity
          className="w-36 h-36 self-center mt-10"
          onPress={VM.openImagePickerAsync}
        >
          <RN.View
            style={{
              borderRadius: 72,
              overflow: "hidden",
              position: "relative",
            }}
          >
            <RN.Image
              source={
                !VM.profileImage ? UploadProfilePhoto : { uri: VM.profileImage }
              }
              style={{
                width: "100%",
                height: "100%",
              }}
              resizeMode="cover"
            />

            {VM?.profileImage && (
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

        <RN.View className="gap-5 my-11">
          <Input.Root>
            <Input.Content
              icon={<User size={25} strokeWidth={2.5} color={"#FFFFFF"} />}
              errors={FORM.errors.name!}
            >
              <Input.TextInput
                name="name"
                control={FORM.control}
                placeholder="Nome"
                autoCapitalize="words"
              />
            </Input.Content>
          </Input.Root>

          <Input.Root>
            <Input.Content
              icon={<Phone size={23} strokeWidth={2.5} color={"#FFFFFF"} />}
              errors={FORM.errors.phone!}
            >
              <Input.TextInputMask
                name="phone"
                control={FORM.control}
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
                <CalendarDaysIcon
                  strokeWidth={2.5}
                  size={23}
                  color={"#FFFFFF"}
                />
              }
              errors={FORM.errors?.birthDate!}
            >
              <Input.TextInputMask
                name="birthDate"
                type="custom"
                maxLength={10}
                options={{
                  mask: "99/99/9999",
                }}
                control={FORM.control}
                placeholder="Data de nascimento"
                keyboardType="numeric"
              />
            </Input.Content>
          </Input.Root>

          <Dropdown
            name="gender"
            control={FORM.control}
            error={FORM.errors.gender!}
            data={["Masculino", "Feminino"]}
            colorsIndicator={["#4167C5", "#C54186"]}
            placeholder="Selecione um genêro"
            icon={<Mars strokeWidth={2.5} color={"#FFF"} size={23} />}
          />

          <Dropdown
            name="baptized"
            control={FORM.control}
            error={FORM.errors.baptized!}
            data={["Sim", "Não"]}
            placeholder="Batizado no espiríto santo?"
            icon={<Flame strokeWidth={2.5} color={"#FFF"} size={24} />}
          />

          <Input.Root>
            <Input.Content
              icon={<IdCard strokeWidth={2} size={28} color={"#FFFFFF"} />}
              errors={FORM.errors?.memberCard!}
            >
              <Input.TextInputMask
                name="memberCard"
                control={FORM.control}
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
            control={FORM.control}
            error={FORM.errors.suit!}
            placeholder="Selecione um naipe"
            data={["Contralto", "1º Soprano", "2º Soprano"]}
            icon={<MicIcon strokeWidth={2.5} color={"#FFF"} size={23} />}
          />

          <Input.Root>
            <Input.Content
              icon={
                <LocationEdit strokeWidth={2} size={28} color={"#FFFFFF"} />
              }
              errors={FORM.errors?.zipCode!}
            >
              <Input.TextInputMask
                control={FORM.control}
                name="zipCode"
                placeholder="CEP"
                type="custom"
                maxLength={9}
                keyboardType="numeric"
                options={{ mask: "99999-999" }}
                onChangeText={() => {}}
              />
            </Input.Content>
          </Input.Root>

          <Input.Root>
            <Input.Content
              icon={
                <LocationEdit strokeWidth={2} size={28} color={"#FFFFFF"} />
              }
              errors={FORM.errors.street!}
            >
              <Input.TextInput
                name="street"
                control={FORM.control}
                placeholder="Rua"
                autoCapitalize="words"
              />
            </Input.Content>
          </Input.Root>

          <Input.Root>
            <Input.Content
              icon={
                <LocationEdit strokeWidth={2} size={28} color={"#FFFFFF"} />
              }
              errors={FORM.errors.neighborhood!}
            >
              <Input.TextInput
                name="neighborhood"
                control={FORM.control}
                placeholder="Bairro"
                autoCapitalize="words"
              />
            </Input.Content>
          </Input.Root>

          <RN.View style={{ flexDirection: "row", gap: 10 }}>
            <Input.Content
              style={{ flex: 0.55 }}
              icon={
                <LocationEdit strokeWidth={2} size={28} color={"#FFFFFF"} />
              }
              errors={FORM.errors?.number!}
            >
              <Input.TextInput
                control={FORM.control}
                name="number"
                placeholder="Nº"
                keyboardType="numeric"
                maxLength={4}
              />
            </Input.Content>

            <Input.Content
              style={{ flex: 1 }}
              errors={FORM.errors?.complement!}
            >
              <Input.TextInput
                control={FORM.control}
                name="complement"
                placeholder="Complemento (Opcional)"
              />
            </Input.Content>
          </RN.View>
        </RN.View>

        <Button
          onPress={FORM.handleSubmit(VM.onSubmit)}
          activeLoading={VM?.isLoading}
        >
          <Text className="font-poppinsSemiBold text-white">Cadastrar</Text>
        </Button>
      </KeyboardAwareScrollView>
      <Toast
        message={
          member?.id
            ? "Componente editado com sucesso!"
            : "Componente criado com sucesso!"
        }
        onHide={() => VM?.setVisibleToast(false)}
        visible={VM?.visibleToast}
      />
    </RN.View>
  );
};

export default RegisterMemberScreen;
