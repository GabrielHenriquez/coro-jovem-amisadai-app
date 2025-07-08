import Input from "@components/Input";
import Spacer from "@components/Spacer";
import Text from "@components/Text";
import Button from "@components/Button";
import useLoginViewModel from "./view.model";
import {
  AtSign,
  BriefcaseBusinessIcon,
  LockKeyhole,
  Phone,
  User,
} from "lucide-react-native";
import { colors } from "@styles/colors";
import * as RN from "react-native";
import useFormRegister from "../../hooks/forms/useFormRegister";
import AnimatedDropdown from "@components/Dropdown";
import { useState } from "react";

const RegisterView = ({ collapseLogoFn }: any) => {
  const FORM = useFormRegister();
  const VM = useLoginViewModel();
  const [selected, setSelected] = useState(null);

  return (
    <RN.View
      style={{ borderTopLeftRadius: 45, borderTopRightRadius: 45 }}
      className="flex-1 bg-background py-5"
    >
      <Text className="text-center font-poppinsBold text-primary" size={28}>
        Criar conta
      </Text>

      <RN.View className="px-5 pb-4 mt-4">
        <RN.View className="gap-4">
          <Input.Root>
            <Input.Content
              icon={<User size={24} color={"#FFFFFF"} />}
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
              icon={<Phone size={22} color={"#FFFFFF"} />}
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
              icon={<AtSign size={22} color={"#FFFFFF"} />}
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

          <AnimatedDropdown
            data={[
              { key: "Dirigente", value: "Dirigente" },
              { key: "Secretário(a)", value: "Secretário(a)" },
              { key: "Vice-Secretário(a)", value: "Vice-Secretário(a)" },
            ]}
            selected={selected}
            setSelected={setSelected}
            icon={<BriefcaseBusinessIcon color={"#FFF"} size={22} />}
          />

          <Input.Root>
            <Input.Content
              icon={<LockKeyhole size={22} color={"#FFFFFF"} />}
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
              icon={<LockKeyhole size={22} color={"#FFFFFF"} />}
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
          activeLoading={VM?.isLoading}
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

export default RegisterView;
