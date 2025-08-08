import * as RN from "react-native";
import Text from "@components/Text";
import { colors } from "@styles/colors";
import { IMember } from "@features/members/domain/entities/Member";
import { useCreateCallContext } from "../contexts/CreateCallContext";

const MemberCard = ({
  item,
}: {
  item: IMember;
  onPress?: VoidFunction;
  isSelected: boolean;
}) => {
  const { validateIsActive, handleItemSelected } = useCreateCallContext();
  const isSelected = validateIsActive(item?.id);
  return (
    <RN.TouchableOpacity
      style={{
        borderWidth: 1.5,
        borderColor: isSelected ? "#ffffff" : "#CCC",
        paddingVertical: 5,
        backgroundColor: isSelected ? "#7f917c" : colors.white,
        gap: 18,
      }}
      className="px-5 rounded-2xl flex-row items-center"
      onPress={() => handleItemSelected(item)}
    >
      <RN.View
        style={{
          borderRadius: 30,
          width: 12,
          height: 28,
          backgroundColor:
            item?.gender === "Masculino"
              ? colors.blueGender
              : colors.pinkGender,
        }}
        className="bg-blue"
      />

      <RN.View className="gap-3 flex-row items-center">
        <RN.Image
          source={{
            uri: item?.profileImageUri,
          }}
          style={{
            width: 38,
            height: 38,
            borderRadius: 30,
            borderWidth: 1,
            borderColor: isSelected ? colors.white : colors.gray2,
          }}
        />

        <RN.View className="gap-1.5">
          <Text
            size={17}
            className={`font-poppinsSemiBold leading-none ${
              isSelected ? "text-white" : "text-black"
            }`}
          >
            {item?.name}
          </Text>

          {/*  <RN.View className="flex-row gap-1.5 items-center right-0.5">
            <Mic2 color={colors.gray} size={18} />
            <Text
              size={14}
              className="font-poppinsMedium text-gray leading-none"
            >
              Baixo • 25 anos
            </Text>
          </RN.View> */}
        </RN.View>
      </RN.View>
    </RN.TouchableOpacity>
  );
};

export default MemberCard;
