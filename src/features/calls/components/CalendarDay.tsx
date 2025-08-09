import * as RN from "react-native";
import React, { memo, useMemo } from "react";
import { DateData, DayState } from "react-native-calendars/src/types";
import styles from "../styles/CallsStyles";

const CalendarDay = memo(
  ({
    date,
    isExpanded,
    state,
    marking,
    getEventsByDateToCard,
    day,
  }: {
    getEventsByDateToCard: (date: string) => void;
    date?: DateData;
    isExpanded: boolean;
    state?: DayState;
    marking?: any;
    day: string;
  }) => {
    if (!date) return null;

    const isSelected = date.dateString === day;
    const dots = marking?.dots || [];
    const memoizedDots = useMemo(() => dots, [dots]);
    const handlePress = () => {
      if (!isSelected) getEventsByDateToCard(date.dateString);
    };

    return (
      <RN.TouchableOpacity
        style={[
          styles.day,
          isSelected && styles.daySelected,
          isExpanded && { bottom: 14 },
        ]}
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

        <RN.View style={{ flexDirection: "row", gap: 0.5, marginTop: 0.5 }}>
          {memoizedDots.map((dot: any, index: number) => (
            <RN.View
              key={index}
              style={{
                width: 7,
                height: 7,
                borderRadius: 3,
                backgroundColor: dot.color || "#F06543",
                marginHorizontal: 1,
              }}
            />
          ))}
        </RN.View>
      </RN.TouchableOpacity>
    );
  },
  (prev, next) =>
    prev.date?.dateString === next.date?.dateString &&
    prev.state === next.state &&
    prev.marking === next.marking
);

export default CalendarDay;
