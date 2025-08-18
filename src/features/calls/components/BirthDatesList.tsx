import React from "react";
import * as RN from "react-native";
import { Text } from "@components/index";
import { BirthDateShimmer } from "./EventCardShimmer";
import ProfileImage from "@components/ProfileImage";

interface BirthDatesListProps {
  getBirthDatesQuery: any;
  eventsBirthDate: any[];
}

const BirthDatesList: React.FC<BirthDatesListProps> = ({
  getBirthDatesQuery,
  eventsBirthDate,
}) => {
  if (getBirthDatesQuery.isLoading) {
    return (
      <>
        {Array.from({ length: 1 }).map((_, index) => (
          <BirthDateShimmer key={index} />
        ))}
      </>
    );
  }

  if (eventsBirthDate.length > 0) {
    return (
      <>
        {eventsBirthDate.map((event) => (
          <RN.View
            style={{ borderWidth: 1, borderColor: "#CCC", elevation: 3 }}
            className="px-4 py-2 bg-white rounded-xl gap-5 flex-row items-center"
            key={event.id}
          >
            <RN.View
              style={{
                borderRadius: 30,
                width: 15,
                backgroundColor: "#B8BD2D",
              }}
              className="h-11"
            />

            <RN.View className="flex-row items-center gap-3">
              <ProfileImage
                data={{ name: event?.name, uri: event?.profileImage }}
                size={44}
              />
              <RN.View className="gap-0.5">
                <Text className="font-poppinsSemiBold">
                  Aniversariante do dia! 🎉
                </Text>
                <Text size={15} className="font-poppinsMedium text-grayDark">
                  {event?.name}
                </Text>
              </RN.View>
            </RN.View>
          </RN.View>
        ))}
      </>
    );
  }

  return null;
};

export default React.memo(BirthDatesList);
