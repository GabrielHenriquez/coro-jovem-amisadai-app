import * as RN from "react-native";
import React from "react";
import Text from "@components/Text";
import { Feather, Ionicons } from "@expo/vector-icons";

const EventCard = () => {
  return (
    <RN.TouchableOpacity
      style={{
        borderWidth: 1,
        borderColor: "#CCC",
        elevation: 2,
      }}
      className="flex-row items-center gap-4 mt-3 py-2 px-3 bg-white rounded-xl"
    >
      <RN.View
        style={{
          borderRadius: 30,
        }}
        className="h-12 w-5 bg-red-600"
      />
      <RN.View className="gap-0.5">
        <Text className="font-poppinsMedium">
          Chamada - Coro Jovem Amisadai
        </Text>

        <RN.View style={{ gap: 8, flexDirection: "row", alignItems: "center" }}>
          <Feather size={16} name="book-open" />
          <Text size={14} className="font-poppins text-grayDark">
            Culto: Pregação
          </Text>
        </RN.View>

        <RN.View style={{ gap: 7, flexDirection: "row", alignItems: "center" }}>
          <Ionicons size={17} name="stopwatch-outline" />
          <Text size={14} className="font-poppins  text-grayDark">
            Horário: 19h30
          </Text>
        </RN.View>
      </RN.View>
    </RN.TouchableOpacity>
  );
};

export default EventCard;
