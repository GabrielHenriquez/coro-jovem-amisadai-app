import * as RN from "react-native";
import React from "react";
import Text from "@components/Text";
import { Mic2 } from "lucide-react-native";
import { colors } from "@styles/colors";

const MemberCard = () => {
  return (
    <RN.TouchableOpacity
      style={{
        borderWidth: 1,
        borderColor: "#CCC",
        elevation: 2,
      }}
      className="flex-row items-center gap-4 py-2 px-4 bg-white rounded-2xl"
    >
      <RN.View
        style={{
          borderRadius: 30,
        }}
        className="h-12 w-5 bg-red-600"
      />
      <RN.View className="gap-3 flex-row items-center">
        <RN.Image
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/coro-jovem-amisadai.appspot.com/o/component-Gabriel%20Henrique%20Soares-002684712%2FprofileImage?alt=media&token=188f4a75-42e6-4a55-9322-56e10cbc36dc",
          }}
          style={{
            width: 54,
            height: 54,
            borderRadius: 30,
            borderWidth: 1,
            borderColor: "#c4c4c4",
          }}
        />

        <RN.View className="gap-2">
          <Text size={18} className="font-poppinsMedium leading-none">
            Gabriel Henrique
          </Text>

          <RN.View className="flex-row gap-0.5 items-center right-0.5">
            <Mic2 color={colors.gray4} size={20} />
            <Text className="font-poppinsMedium text-gray4 leading-none">
              Baixo • 25 anos
            </Text>
          </RN.View>
        </RN.View>
      </RN.View>
    </RN.TouchableOpacity>
  );
};

export default MemberCard;
