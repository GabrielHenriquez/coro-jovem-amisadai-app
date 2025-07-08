import Input from "@components/Input";
import Spacer from "@components/Spacer";
import Text from "@components/Text";
import useFormLogin from "../../hooks/forms/useFormLogin";
import Button from "@components/Button";
import useLoginViewModel from "./view.model";
import Modal from "@components/Modal";
import WarnRedLogo from "@assets/images/modal/warn-red.svg";
import { AtSign, LockKeyhole } from "lucide-react-native";
import { colors } from "@styles/colors";
import * as RN from "react-native";

const LoginView = ({ collapseLogoFn }: { collapseLogoFn: VoidFunction }) => {
  const FORM = useFormLogin();
  const VM = useLoginViewModel();

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
            <WarnRedLogo width={90} height={90} />
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

export default LoginView;
