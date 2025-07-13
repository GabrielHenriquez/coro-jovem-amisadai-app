import * as RN from "react-native";
import React, { memo } from "react";
import { DateData, DayState } from "react-native-calendars/src/types";
import styles from "../styles/CallsStyles";

const CalendarDay = memo(
  ({
    date,
    state,
    day,
    setDay,
  }: {
    date: DateData;
    state: DayState;
    day: DateData;
    setDay: React.Dispatch<React.SetStateAction<DateData | undefined>>;
  }) => {
    if (!date) return null;

    const isSelected = date.dateString === day?.dateString;

    const handlePress = () => {
      if (!isSelected) setDay(date);
    };

    return (
      <RN.TouchableOpacity
        style={[styles.day, isSelected && styles.daySelected]}
        onPress={handlePress}
      >
        <RN.Text
          style={[
            styles.dayText,
            (state === "inactive" || state === "disabled") && styles.disabled,
            state === "today" && styles.today,
            isSelected && styles.dayText,
          ]}
        >
          {date.day}
        </RN.Text>
      </RN.TouchableOpacity>
    );
  },
  (prev, next) =>
    prev.date.dateString === next.date.dateString && prev.state === next.state
);

export default memo(CalendarDay);
