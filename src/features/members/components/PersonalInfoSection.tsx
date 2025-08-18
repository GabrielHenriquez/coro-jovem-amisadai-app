import * as RN from "react-native";
import { Input, Dropdown } from "@components/index";
import * as Icons from "lucide-react-native";
import {
  VoiceValue,
  GENDERS,
  BAPTIZED_OPTIONS,
  MemberFormData,
  MemberFormHookReturn,
} from "../domain/entities/MemberForm";

interface PersonalInfoSectionProps {
  form: MemberFormHookReturn;
  errors: Record<string, any>;
  suitData: VoiceValue[];
}

export const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({
  form,
  errors,
  suitData,
}) => (
  <RN.View className="gap-5">
    <Input.Root>
      <Input.Content
        icon={<Icons.User size={25} strokeWidth={2.5} color={"#FFFFFF"} />}
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
        icon={<Icons.Phone size={23} strokeWidth={2.5} color={"#FFFFFF"} />}
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
          <Icons.CalendarDaysIcon
            strokeWidth={2.5}
            size={23}
            color={"#FFFFFF"}
          />
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
      icon={<Icons.Mars strokeWidth={2.5} color={"#FFF"} size={23} />}
    />

    <Dropdown
      name="baptized"
      control={form.control}
      error={errors.baptized!}
      data={BAPTIZED_OPTIONS}
      placeholder="Batizado no espiríto santo?"
      icon={<Icons.Flame strokeWidth={2.5} color={"#FFF"} size={24} />}
    />

    <Input.Root>
      <Input.Content
        icon={<Icons.IdCard strokeWidth={2} size={28} color={"#FFFFFF"} />}
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
      icon={<Icons.MicIcon strokeWidth={2.5} color={"#FFF"} size={23} />}
    />
  </RN.View>
);
