import { Button, Modal, Spacer, Input, Text } from "@components/index";
import { useFormLogin, useLogin } from "../hooks";
import { WarnLogo } from "@assets/images/modal";
import { AtSign, LockKeyhole } from "lucide-react-native";
import { colors } from "@styles/colors";
import * as RN from "react-native";

const LoginContent = ({ collapseLogoFn }: { collapseLogoFn: VoidFunction }) => {
  const FORM = useFormLogin();
  const VM = useLogin();

  return (
    <RN.View
      style={{ borderTopLeftRadius: 45, borderTopRightRadius: 45 }}
      className="flex-1 bg-background py-4"
    >
      <Text className="text-center font-poppinsBold text-primary" size={28}>
        Acesse sua conta
      </Text>

      <RN.View className="px-5 mt-4">
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

        <Spacer height={16} />

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

        <Spacer height={34} />

        <Button
          activeLoading={VM?.isLoading}
          onPress={FORM.handleSubmit(VM.onSubmit)}
        >
          <Text className="font-poppinsSemiBold text-white">Entrar</Text>
        </Button>
        <Spacer height={14} />
        <Button
          bgColor="white"
          styleRest={{
            borderWidth: 1.5,
            borderColor: colors.primary,
          }}
          activeLoading={VM?.isLoading}
          onPress={() => {
            collapseLogoFn();
          }}
        >
          <Text className="font-poppinsSemiBold text-primary">
            Criar uma conta
          </Text>
        </Button>
      </RN.View>

      <Modal.Root>
        <Modal.Content visible={VM?.isError}>
          <Modal.Logo>
            <WarnLogo width={90} height={90} />
          </Modal.Logo>
          <Modal.Title>Credenciais inválidas!</Modal.Title>
          <Button
            bgColor="redDark"
            styleRest={{ height: 40 }}
            onPress={VM.reset}
          >
            <Text className="text-white font-poppinsSemiBold">
              Tentar novamente
            </Text>
          </Button>
        </Modal.Content>
      </Modal.Root>
    </RN.View>
  );
};

export default LoginContent;
