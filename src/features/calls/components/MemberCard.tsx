import * as RN from "react-native";
import Text from "@components/Text";
import { colors } from "@styles/colors";

const MemberCard = ({
  onPress,
  isSelected,
}: {
  onPress?: VoidFunction;
  isSelected: boolean;
}) => {
  return (
    <RN.TouchableOpacity
      style={{
        borderWidth: 1.5,
        borderColor: isSelected ? "#7b8d75" : "#CCC",
        paddingVertical: 5,
        backgroundColor: isSelected ? "#7b8d75" : colors.white,
        gap: 18,
      }}
      className="px-5 rounded-2xl flex-row items-center"
    >
      <RN.View
        style={{
          borderRadius: 30,
          width: 12,
          height: 28,
          backgroundColor: "#3364df",
        }}
        className="bg-blue"
      />

      <RN.View className="gap-3 flex-row items-center">
        <RN.Image
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/coro-jovem-amisadai.appspot.com/o/component-Gabriel%20Henrique%20Soares-002684712%2FprofileImage?alt=media&token=188f4a75-42e6-4a55-9322-56e10cbc36dc",
          }}
          style={{
            width: 37,
            height: 37,
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
            Gabriel Henrique
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
