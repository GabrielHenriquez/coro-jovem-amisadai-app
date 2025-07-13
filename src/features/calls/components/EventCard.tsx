import * as RN from "react-native";
import React from "react";
import Text from "@components/Text";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Clock } from "lucide-react-native";

const EventCard = ({ onPress }: { onPress: VoidFunction }) => {
  return (
    <RN.TouchableOpacity
      style={{
        borderWidth: 1,
        borderColor: "#CCC",
        elevation: 3,
        gap: 18,
      }}
      onPress={onPress}
      className="flex-row items-center mt-3 py-3 px-4 bg-white rounded-xl"
    >
      <RN.View
        style={{
          borderRadius: 30,
          width: 16.5,
        }}
        className="h-12  bg-red-600"
      />
      <RN.View className="gap-2">
        <Text className="font-poppinsSemiBold">
          Chamada - Coro Jovem Amisadai
        </Text>

        <RN.View style={{ gap: 8, flexDirection: "row", alignItems: "center" }}>
          <Feather size={14} name="book-open" />
          <Text size={14} className="font-poppinsMedium text-grayDark">
            Culto: Pregação
          </Text>
        </RN.View>

        <RN.View style={{ gap: 8, flexDirection: "row", alignItems: "center" }}>
          <Clock size={14} />
          <Text size={14} className="font-poppinsMedium  text-grayDark">
            Horário: 19h30
          </Text>
        </RN.View>
      </RN.View>
    </RN.TouchableOpacity>
  );
};

export default EventCard;
