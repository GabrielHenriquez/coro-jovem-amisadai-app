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
  hasBirthDates: boolean;
  handleGetEvent: (id: string) => void;
}

const EventsList: React.FC<EventsListProps> = ({
  loadingData,
  events,
  currentDateDisplay,
  hasBirthDates,
  handleGetEvent,
}) => {
  if (loadingData) {
    return (
      <>
        {Array.from({ length: 1 }).map((_, index) => (
          <EventCardShimmer key={index} />
        ))}
      </>
    );
  }

  if (events?.length > 0) {
    return (
      <>
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onPress={() => handleGetEvent(event?.id)}
          />
        ))}
      </>
    );
  }

  if (!hasBirthDates) {
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
  }
};

export default React.memo(EventsList);
