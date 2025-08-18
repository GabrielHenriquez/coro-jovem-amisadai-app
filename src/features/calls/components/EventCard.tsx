import * as RN from "react-native";
import React from "react";
import Text from "@components/Text";
import { Feather } from "@expo/vector-icons";
import { Clock } from "lucide-react-native";
import { IEventCard } from "../domain/entities/Events";
import { colors } from "@styles/colors";

const EventCard = ({
  onPress,
  event,
}: {
  onPress: VoidFunction;
  event: IEventCard;
}) => {
  return (
    <RN.TouchableOpacity
      style={{
        borderWidth: 1,
        borderColor: "#CCC",
        elevation: 3,
        gap: 18,
      }}
      onPress={onPress}
      className="flex-row items-center py-2.5 px-4 bg-white rounded-xl"
    >
      <RN.View
        style={{
          borderRadius: 30,
          width: 16.5,
          backgroundColor:
            event?.type === "Saída" ? colors.redEvent : colors.blueEvent,
        }}
        className="h-12"
      />
      <RN.View className="gap-1.5">
        <Text className="font-poppinsSemiBold">
          Chamada - Coro Jovem Amisadai
        </Text>

        <RN.View style={{ gap: 8, flexDirection: "row", alignItems: "center" }}>
          <Feather size={14} name="book-open" />
          <Text
            numberOfLines={1}
            size={14}
            className="font-poppinsMedium text-grayDark flex-1"
          >
            Culto: {event?.cult || "Não informado"}
          </Text>
        </RN.View>

        <RN.View style={{ gap: 8, flexDirection: "row", alignItems: "center" }}>
          <Clock size={14} />
          <Text size={14} className="font-poppinsMedium  text-grayDark">
            Horário: {event?.hour || "Não informado"}
          </Text>
        </RN.View>
      </RN.View>
    </RN.TouchableOpacity>
  );
};

export default EventCard;
