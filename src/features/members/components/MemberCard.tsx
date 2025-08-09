import * as RN from "react-native";
import Text from "@components/Text";
import { Mic2 } from "lucide-react-native";
import { colors } from "@styles/colors";
import { IMember } from "../domain/entities/Member";
import { calcularIdade } from "../utils/calculateAge";
import ProfileImage from "@components/ProfileImage";

const MemberCard = ({
  onPress,
  member,
}: {
  onPress: VoidFunction;
  member: IMember;
}) => {
  return (
    <RN.TouchableOpacity
      style={{
        borderWidth: 1,
        borderColor: "#CCC",
        paddingVertical: 7,
        elevation: 3,
        gap: 20,
      }}
      onPress={() => onPress(member?.id)}
      className="px-5 bg-white rounded-2xl flex-row items-center"
    >
      <RN.View
        style={{
          borderRadius: 30,
          width: 14,
          backgroundColor:
            member?.gender === "Masculino" ? colors.blue : "#bd236b",
        }}
        className="h-11"
      />

      <RN.View className="gap-3.5 flex-row items-center">
        <ProfileImage
          data={{ name: member?.name, uri: member?.profileImageUri }}
          size={52}
        />

        <RN.View className="gap-1">
          <Text size={17} className="font-poppinsSemiBold leading-none">
            {member?.name}
          </Text>

          <RN.View className="flex-row gap-1.5 items-center right-0.5">
            <Mic2 color={colors.gray} size={16} />
            <Text
              size={14}
              className="font-poppinsMedium text-gray leading-none"
            >
              {member?.suit} • {calcularIdade(member?.birthDate)} anos
            </Text>
          </RN.View>
        </RN.View>
      </RN.View>
    </RN.TouchableOpacity>
  );
};

export default MemberCard;
