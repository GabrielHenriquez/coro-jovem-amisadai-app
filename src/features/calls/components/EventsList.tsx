import React from "react";
import * as RN from "react-native";
import { Text } from "@components/index";
import EventCard from "./EventCard";
import EventCardShimmer from "./EventCardShimmer";
import { EmptyCall } from "@assets/images";

interface EventsListProps {
  loadingData: boolean;
  events: any[];
  currentDateDisplay: string;
  handleGetEvent: (id: string) => void;
}

const EventsList: React.FC<EventsListProps> = ({
  loadingData,
  events,
  currentDateDisplay,
  handleGetEvent,
}) => {
  if (loadingData) {
    return (
      <RN.View className="gap-0.5">
        {Array.from({ length: 2 }).map((_, index) => (
          <EventCardShimmer key={index} />
        ))}
      </RN.View>
    );
  }

  if (events?.length > 0) {
    return (
      <RN.View>
        <Text size={20} className="font-poppinsSemiBold text-black">
          {currentDateDisplay}
        </Text>

        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onPress={() => handleGetEvent(event?.id)}
          />
        ))}
      </RN.View>
    );
  }

  return (
    <RN.View className="items-center px-10">
      <RN.Image
        source={EmptyCall as RN.ImageSourcePropType}
        style={{
          width: 68,
          height: 68,
        }}
        resizeMode="contain"
      />
      <Text className="font-poppinsSemiBold text-center text-black">
        Nenhuma chamada registrada: {currentDateDisplay}.
      </Text>
    </RN.View>
  );
};

export default React.memo(EventsList);
