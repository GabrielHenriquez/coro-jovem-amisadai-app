import { Input, Spacer, Text, Button, Dropdown } from "@components/index";
import { colors } from "@styles/colors";
import { useFormRegister, useRegister } from "../hooks";
import {
  AtSign,
  BriefcaseBusinessIcon,
  LockKeyhole,
  Phone,
  User,
} from "lucide-react-native";
import * as RN from "react-native";

export type OfficeValue = "Dirigente" | "Secretário(a)" | "Vice-secretário(a)";

const RegisterContent = ({ collapseLogoFn }: any) => {
  const FORM = useFormRegister();
  const VM = useRegister();

  return (
    <RN.View
      style={{ borderTopLeftRadius: 45, borderTopRightRadius: 45 }}
      className="flex-1 bg-background py-5"
    >
      <Text className="text-center font-poppinsBold text-primary" size={26}>
        Criar conta
      </Text>

      <RN.View className="px-5 pb-4 mt-5">
        <RN.View className="gap-4">
          <Input.Root>
            <Input.Content
              icon={<User size={22} color={"#FFFFFF"} strokeWidth={2.5} />}
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
              icon={<Phone size={20} color={"#FFFFFF"} strokeWidth={2.5} />}
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
              icon={<AtSign size={20} color={"#FFFFFF"} strokeWidth={2.5} />}
              errors={FORM.errors.email!}
            >
              <Input.TextInput
                name="email"
                control={FORM.control}
                placeholder="E-mail"
                autoCapitalize="none"
              />
            </Input.Content>
          </Input.Root>

          <Dropdown
            data={["Dirigente", "Secretário(a)", "Vice-secretário(a)"]}
            placeholder="Selecione seu cargo"
            control={FORM.control}
            name="office"
            icon={
              <BriefcaseBusinessIcon
                size={20}
                color={"#FFFFFF"}
                strokeWidth={2.5}
              />
            }
            error={FORM.errors.office!}
          />

          <Input.Root>
            <Input.Content
              icon={
                <LockKeyhole size={20} color={"#FFFFFF"} strokeWidth={2.5} />
              }
              errors={FORM.errors.password!}
            >
              <Input.TextInput
                name="password"
                control={FORM.control}
                placeholder="Senha"
                isActivePassword={FORM.secureTextActive}
                autoCapitalize="none"
              />
              <Input.IconPassword
                secureTextActive={FORM.secureTextActive}
                errors={!!FORM.errors.password}
                onPress={() => FORM.setSecureTextActive(!FORM.secureTextActive)}
              />
            </Input.Content>
          </Input.Root>

          <Input.Root>
            <Input.Content
              icon={
                <LockKeyhole size={20} color={"#FFFFFF"} strokeWidth={2.5} />
              }
              errors={FORM.errors.passwordConfirm!}
            >
              <Input.TextInput
                name="passwordConfirm"
                control={FORM.control}
                placeholder="Repetir senha"
                isActivePassword={FORM.secureTextActiveConfirmation}
                autoCapitalize="none"
              />
              <Input.IconPassword
                secureTextActive={FORM.secureTextActiveConfirmation}
                errors={!!FORM.errors.passwordConfirm}
                onPress={() =>
                  FORM.setSecureTextActiveConfirmation(
                    !FORM.secureTextActiveConfirmation
                  )
                }
              />
            </Input.Content>
          </Input.Root>
        </RN.View>

        <Spacer height={34} />

        <Button
          activeLoading={VM?.isLoading}
          onPress={FORM.handleSubmit(VM.onSubmit)}
        >
          <Text className="font-poppinsSemiBold text-white">Criar conta</Text>
        </Button>
        <Spacer height={14} />
        <Button
          bgColor="white"
          styleRest={{
            borderWidth: 1.5,
            borderColor: colors.primary,
          }}
          onPress={collapseLogoFn}
        >
          <Text className="font-poppinsSemiBold text-primary">
            Entrar em uma conta
          </Text>
        </Button>
      </RN.View>
    </RN.View>
  );
};

export default RegisterContent;
