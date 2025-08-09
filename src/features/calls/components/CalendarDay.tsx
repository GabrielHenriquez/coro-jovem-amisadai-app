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
    test,
    day,
    setDay,
  }: {
    test: any;
    date: DateData;
    isExpanded: boolean;
    state: DayState;
    marking?: any; // importante: aqui vem dots, selected etc.
    day: DateData;
    setDay: React.Dispatch<React.SetStateAction<DateData | undefined>>;
  }) => {
    if (!date) return null;

    const isSelected = date.dateString === day?.dateString;
    const dots = marking?.dots || [];
    const memoizedDots = useMemo(() => dots, [dots]);
    const handlePress = () => {
      if (!isSelected) {
        test(date.dateString);
        setDay(date);
      }
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

        <RN.View style={{ flexDirection: "row", gap: 0.5 }}>
          {memoizedDots.map((dot: any, index: number) => (
            <RN.View
              key={index}
              style={{
                width: 6.5,
                height: 6.5,
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
    prev.date.dateString === next.date.dateString &&
    prev.state === next.state &&
    prev.marking === next.marking
);

export default CalendarDay;
