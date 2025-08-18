import * as RN from "react-native";
import { Input } from "@components/index";
import * as Icons from "lucide-react-native";
import { MemberFormData, MemberFormHookReturn } from "../domain/entities/MemberForm";

interface AddressSectionProps {
  form: MemberFormHookReturn;
  errors: Record<string, any>;
}

export const AddressSection: React.FC<AddressSectionProps> = ({
  form,
  errors,
}) => (
  <RN.View className="gap-5">
    <Input.Root>
      <Input.Content
        icon={
          <Icons.LocationEdit strokeWidth={2} size={28} color={"#FFFFFF"} />
        }
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
        icon={
          <Icons.LocationEdit strokeWidth={2} size={28} color={"#FFFFFF"} />
        }
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
        icon={
          <Icons.LocationEdit strokeWidth={2} size={28} color={"#FFFFFF"} />
        }
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
        icon={
          <Icons.LocationEdit strokeWidth={2} size={28} color={"#FFFFFF"} />
        }
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
