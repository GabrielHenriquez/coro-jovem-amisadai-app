import * as RN from "react-native";
import { Dropdown, Input } from "@components/index";
import {
  BookOpen,
  CalendarDaysIcon,
  Clock,
  LocationEdit,
  Notebook,
  User,
} from "lucide-react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";

import { useFormContext } from "react-hook-form";

export type CallValue = "Local" | "Saída";

const CreateCallFormContent = () => {
  const formValidator = useFormContext();
  const { errors } = formValidator.formState;
  const { watch } = formValidator;
  const callType = watch("callType");

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={"height"}
      keyboardVerticalOffset={0}
    >
      <RN.TouchableWithoutFeedback onPress={RN.Keyboard.dismiss}>
        <RN.ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <RN.View className="gap-5">
            <Input.Root>
              <Input.Content
                icon={
                  <BookOpen size={22} strokeWidth={2.5} color={"#FFFFFF"} />
                }
                errors={errors.cult!}
              >
                <Input.TextInput
                  name="cult"
                  control={formValidator.control}
                  placeholder="Culto"
                  autoCapitalize="words"
                />
              </Input.Content>
            </Input.Root>

            <Input.Root>
              <Input.Content
                icon={<Clock size={22} strokeWidth={2.5} color={"#FFFFFF"} />}
                errors={errors.hour!}
              >
                <Input.TextInputMask
                  name="hour"
                  control={formValidator.control}
                  placeholder="Horário"
                  keyboardType="numeric"
                  type="custom"
                  maxLength={5}
                  options={{
                    mask: "99h99",
                  }}
                />
              </Input.Content>
            </Input.Root>

            <Input.Root>
              <Input.Content
                icon={
                  <CalendarDaysIcon
                    strokeWidth={2.5}
                    size={22}
                    color={"#FFFFFF"}
                  />
                }
                errors={errors?.date!}
              >
                <Input.TextInputMask
                  name="date"
                  type="custom"
                  maxLength={10}
                  options={{
                    mask: "99/99/9999",
                  }}
                  control={formValidator.control}
                  placeholder="Data"
                  keyboardType="numeric"
                />
              </Input.Content>
            </Input.Root>

            <Input.Root>
              <Input.Content
                icon={<User size={23} strokeWidth={2.5} color={"#FFFFFF"} />}
                errors={errors.namePreacher!}
              >
                <Input.TextInput
                  name="namePreacher"
                  control={formValidator.control}
                  placeholder="Nome do escalado (Opcional)"
                  autoCapitalize="words"
                />
              </Input.Content>
            </Input.Root>

            <Dropdown
              name="callType"
              control={formValidator.control}
              error={errors.callType!}
              placeholder="Selecione o tipo de chamada"
              data={["Local", "Saída"]}
              colorsIndicator={["#32C0CA", "#BD2D2D"]}
              icon={<Notebook strokeWidth={2.5} color={"#FFF"} size={22} />}
            />

            {callType === "Saída" && (
              <Input.Root>
                <Input.Content
                  icon={
                    <LocationEdit
                      size={23}
                      strokeWidth={2.5}
                      color={"#FFFFFF"}
                    />
                  }
                  errors={errors.local!}
                >
                  <Input.TextInput
                    name="local"
                    control={formValidator.control}
                    placeholder="Local da saída (Opcional)"
                    autoCapitalize="words"
                  />
                </Input.Content>
              </Input.Root>
            )}
          </RN.View>
        </RN.ScrollView>
      </RN.TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default CreateCallFormContent;
