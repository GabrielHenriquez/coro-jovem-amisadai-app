import * as RN from "react-native";
import Text from "@components/Text";
import { Mic2 } from "lucide-react-native";
import { colors } from "@styles/colors";

const MemberCard = ({ onPress }: { onPress: VoidFunction }) => {
  return (
    <RN.TouchableOpacity
      style={{
        borderWidth: 1,
        borderColor: "#CCC",
        paddingVertical: 7,
        elevation: 3,
        gap: 20,
      }}
      onPress={onPress}
      className="px-5 bg-white rounded-2xl flex-row items-center"
    >
      <RN.View
        style={{
          borderRadius: 30,
          width: 14,
        }}
        className="h-11 bg-blue"
      />

      <RN.View className="gap-3.5 flex-row items-center">
        <RN.Image
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/coro-jovem-amisadai.appspot.com/o/component-Gabriel%20Henrique%20Soares-002684712%2FprofileImage?alt=media&token=188f4a75-42e6-4a55-9322-56e10cbc36dc",
          }}
          style={{
            width: 52,
            height: 52,
            borderRadius: 30,
            borderWidth: 1,
            borderColor: colors.gray,
          }}
        />

        <RN.View className="gap-1">
          <Text size={17} className="font-poppinsSemiBold leading-none">
            Gabriel Henrique
          </Text>

          <RN.View className="flex-row gap-1.5 items-center right-0.5">
            <Mic2 color={colors.gray} size={16} />
            <Text
              size={14}
              className="font-poppinsMedium text-gray leading-none"
            >
              Baixo • 25 anos
            </Text>
          </RN.View>
        </RN.View>
      </RN.View>
    </RN.TouchableOpacity>
  );
};

export default MemberCard;
