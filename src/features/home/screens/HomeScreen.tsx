import { useCallback, useRef, useState, memo } from "react";
import { Feather } from "@expo/vector-icons";
import { ptBR } from "../utils/index";
import { DayState } from "react-native-calendars/src/types";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@components/index";
import { EventCard } from "../components";
import { LogoAmisadai } from "@assets/images";
import { Menu } from "lucide-react-native";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import styles from "../styles/HomeStyles";
import * as RN from "react-native";
import * as RNC from "react-native-calendars";

RNC.LocaleConfig.locales["pt-br"] = ptBR;
RNC.LocaleConfig.defaultLocale = "pt-br";

export default function HomeScreen() {
  const [day, setDay] = useState<RNC.DateData>();
  const [opennedCalendar, setOpennedCalendar] = useState(false);
  const { dispatch } = useNavigation();

  const calendarHeight = useRef(new RN.Animated.Value(165)).current;

  const toggleCalendar = useCallback((isOpen: boolean) => {
    setOpennedCalendar(isOpen);

    RN.Animated.timing(calendarHeight, {
      toValue: isOpen ? 365 : 165,
      duration: 1000,
      easing: RN.Easing.out(RN.Easing.ease),
      useNativeDriver: false,
    }).start();
  }, []);

  const Day = memo(
    ({ date, state }: { date: RNC.DateData; state: DayState }) => {
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

  const calendarHeader = (
    <RN.View style={styles.calendarHeader}>
      <Feather size={24} color="#E8E8E8" name="calendar" />
      <RN.Text style={styles.calendarHeaderText}>Dezembro 2025</RN.Text>
    </RN.View>
  );

  const sharedCalendarProps = {
    renderArrow: (direction: "right" | "left") => (
      <Feather size={32} color="#E8E8E8" name={`chevron-${direction}`} />
    ),
    headerStyle: styles.headerStyle,
    theme: {
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
    },
    customHeaderTitle: calendarHeader,
    markedDates: day ? { [day.dateString]: { selected: true } } : undefined,
    dayComponent: (props: { date?: RNC.DateData; state?: DayState }) => (
      <Day date={props.date} state={props.state} />
    ),
  };

  return (
    <SafeAreaView style={styles.container}>
      <RN.StatusBar translucent backgroundColor="#4C5E46" />
      <RN.View style={styles.header}>
        <RN.View
          style={{
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 8,
            paddingTop: 14,
          }}
        >
          <RN.TouchableOpacity
            onPress={() => dispatch(DrawerActions.openDrawer())}
            style={{
              position: "absolute",
              left: 16,
            }}
          >
            <Menu size={36} color="#FFF" />
          </RN.TouchableOpacity>

          <LogoAmisadai width={140} height={70} />
        </RN.View>

        <RN.Animated.View
          style={[
            {
              height: calendarHeight,
              overflow: "hidden",
              paddingHorizontal: 10,
            },
          ]}
        >
          <RNC.CalendarProvider
            date={day?.dateString || "2025-07-07"}
            onCalendarToggled={toggleCalendar}
          >
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
                  disablePan
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
                  },
                ]}
              >
                <RNC.Calendar
                  {...sharedCalendarProps}
                  minDate={new Date().toDateString()}
                  hideExtraDays
                  style={styles.calendar}
                />
              </RN.View>
            </RN.View>
          </RNC.CalendarProvider>
        </RN.Animated.View>

        <RN.TouchableOpacity
          style={styles.toggleButton}
          onPress={() =>
            setOpennedCalendar((prev) => {
              toggleCalendar(!prev);
              return !prev;
            })
          }
        >
          <Feather
            size={28}
            color="#000000"
            name={opennedCalendar ? "chevron-up" : "chevron-down"}
          />
        </RN.TouchableOpacity>
      </RN.View>

      <RN.View style={{ paddingHorizontal: 16, marginTop: 12 }}>
        <Text size={20} className="font-poppinsSemiBold text-black">
          Sexta, 27 de Dezembro
        </Text>

        <EventCard />
      </RN.View>
    </SafeAreaView>
  );
}
