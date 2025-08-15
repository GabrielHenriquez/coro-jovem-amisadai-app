import React, { useMemo, useCallback } from "react";
import { Feather } from "@expo/vector-icons";
import * as RN from "react-native";
import * as RNC from "react-native-calendars";
import { DateData, DayState } from "react-native-calendars/src/types";
import CalendarDay from "./CalendarDay";
import styles from "../styles/CallsStyles";

// Type definitions
interface CalendarMonth {
  month: number;
  year: number;
}

interface CalendarSectionProps {
  handleMonthChange: (month: CalendarMonth) => void;
  opennedCalendar: boolean;
  calendarHeight: number;
  selectedDate: string;
  dots: any;
  getEventsByDateToCard: (date: string) => void;
  toggleCalendar: () => void;
  currentMonthFormatted: string;
  currentMonth: string;
}

const CalendarSection: React.FC<CalendarSectionProps> = ({
  handleMonthChange,
  opennedCalendar,
  calendarHeight,
  selectedDate,
  dots,
  getEventsByDateToCard,
  toggleCalendar,
  currentMonthFormatted,
  currentMonth,
}) => {
  const calendarHeader = useMemo(
    () => (
      <RN.View style={styles.calendarHeader}>
        <Feather size={24} color="#E8E8E8" name="calendar" />
        <RN.Text style={styles.calendarHeaderText}>
          {currentMonthFormatted || currentMonth}
        </RN.Text>
      </RN.View>
    ),
    [currentMonthFormatted, currentMonth]
  );

  const calendarTheme = useMemo(
    () => ({
      textMonthFontSize: 22,
      textMonthFontFamily: "Rubik_500Medium",
      textDayFontFamily: "Rubik_400Regular",
      monthTextColor: "#ffffff",
      todayTextColor: "#F06543",
      selectedDayBackgroundColor: "#F06543",
      selectedDayTextColor: "#E8E8E8",
      arrowColor: "#E8E8E8",
      calendarBackground: "#4C5E46",
      textDayStyle: { color: "#E8E8E8" },
      dotStyle: {
        width: 8,
        height: 8,
        borderRadius: 50,
      },
    }),
    []
  );

  const sharedCalendarProps = useMemo(
    () => ({
      renderArrow: (direction: "right" | "left") => (
        <Feather size={32} color="#E8E8E8" name={`chevron-${direction}`} />
      ),
      headerStyle: styles.headerStyle,
      theme: calendarTheme,
      customHeaderTitle: calendarHeader,
      markedDates: selectedDate
        ? { [selectedDate]: { selected: true } }
        : undefined,
      dayComponent: (props: {
        date?: DateData;
        state?: DayState;
        marking?: any;
      }) => (
        <CalendarDay
          {...props}
          isExpanded={opennedCalendar}
          day={selectedDate}
          getEventsByDateToCard={getEventsByDateToCard}
        />
      ),
    }),
    [
      calendarTheme,
      calendarHeader,
      getEventsByDateToCard,
      selectedDate,
      opennedCalendar,
    ]
  );

  const handleDayPress = useCallback(
    (dateString: string) => {
      getEventsByDateToCard(dateString);
    },
    [getEventsByDateToCard]
  );

  return (
    <RN.View style={styles.header}>
      <RN.Animated.View
        style={[
          {
            height: calendarHeight,
            overflow: "hidden",
            paddingHorizontal: 10,
          },
        ]}
      >
        <RNC.CalendarProvider date={selectedDate}>
          <RN.View style={styles.calendarWrapper}>
            {/* ExpandableCalendar */}
            <RN.View
              style={[
                styles.calendarOverlay,
                {
                  opacity: !opennedCalendar ? 1 : 0,
                  zIndex: !opennedCalendar ? 2 : 0,
                  pointerEvents: !opennedCalendar ? "auto" : "none",
                },
              ]}
            >
              <RNC.ExpandableCalendar
                {...sharedCalendarProps}
                onCalendarToggled={toggleCalendar}
                onDayPress={(day) => {
                  if (day?.dateString) handleDayPress(day.dateString);
                }}
                disablePan
                onMonthChange={handleMonthChange}
                markingType="multi-dot"
                markedDates={dots}
                disableWeekScroll
                nestedScrollEnabled={false}
                pastScrollRange={12}
                futureScrollRange={12}
                hideKnob
                style={styles.calendar}
              />
            </RN.View>

            {/* Calendar */}
            <RN.View
              style={[
                styles.calendarOverlay,
                {
                  opacity: opennedCalendar ? 1 : 0,
                  zIndex: opennedCalendar ? 2 : 0,
                  pointerEvents: opennedCalendar ? "auto" : "none",
                  paddingHorizontal: 10,
                },
              ]}
            >
              <RNC.Calendar
                {...sharedCalendarProps}
                onDayPress={({ dateString }) => handleDayPress(dateString)}
                onMonthChange={handleMonthChange}
                markingType="multi-dot"
                markedDates={dots}
                hideExtraDays={true}
              />
            </RN.View>
          </RN.View>
        </RNC.CalendarProvider>
      </RN.Animated.View>

      <RN.TouchableOpacity style={styles.toggleButton} onPress={toggleCalendar}>
        <Feather
          size={28}
          color="#000000"
          name={opennedCalendar ? "chevron-up" : "chevron-down"}
        />
      </RN.TouchableOpacity>
    </RN.View>
  );
};

export default React.memo(CalendarSection);
