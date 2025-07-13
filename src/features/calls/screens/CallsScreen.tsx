import { useCallback, useRef, useState, memo, useEffect } from "react";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { htmlContent, ptBR } from "../utils/index";
import { DayState } from "react-native-calendars/src/types";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Text,
  HeaderWithMenu,
  Button,
  BaseBottomSheet,
} from "@components/index";
import { EventCard } from "../components";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { colors } from "@styles/colors";
import { Clock, Pen, Share2, Trash2 } from "lucide-react-native";
import styles from "../styles/CallsStyles";
import getHeight from "@utils/getHeight";
import Pdf from "react-native-pdf";
import * as RN from "react-native";
import * as RNC from "react-native-calendars";
import * as Print from "expo-print";
import * as Share from "expo-sharing";
import CalendarDay from "../components/CalendarDay";
RNC.LocaleConfig.locales["pt-br"] = ptBR;
RNC.LocaleConfig.defaultLocale = "pt-br";

export default function CallScreen() {
  const [day, setDay] = useState<RNC.DateData>();
  const [opennedCalendar, setOpennedCalendar] = useState(false);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const callPreviewModalRef = useRef<BottomSheetModal>(null);
  const [pdfUri, setPdfUri] = useState<string | null>(null);
  const calendarHeight = opennedCalendar ? 355 : 150;

  const handleModalAction = useCallback(
    (ref: React.RefObject<any>, action: "present" | "close") => {
      if (!ref.current) return;
      if (action === "present") return ref.current.present();
      ref.current.close();
    },
    []
  );

  const generatePDF = async () => {
    const { uri } = await Print.printToFileAsync({ html: htmlContent });
    setPdfUri(uri);
  };

  const validate = useCallback(() => {
    handleModalAction(bottomSheetModalRef, "close");
    setTimeout(() => handleModalAction(callPreviewModalRef, "present"), 500);
  }, []);

  useEffect(() => {
    if (pdfUri) validate();
  }, [pdfUri]);

  const sharePDF = async () => {
    await Share.shareAsync(pdfUri!);
  };

  const toggleCalendar = useCallback((isOpen: boolean) => {
    setOpennedCalendar(isOpen);
  }, []);

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
      <CalendarDay
        date={props?.date!}
        state={props?.state!}
        day={day!}
        setDay={setDay}
      />
    ),
  };

  return (
    <SafeAreaView style={styles.container}>
      <RN.StatusBar translucent backgroundColor="#4C5E46" />
      <RN.View style={styles.header}>
        <HeaderWithMenu />

        <RN.Animated.View
          style={[
            {
              height: calendarHeight,
              overflow: "hidden",
              paddingHorizontal: 10,
            },
          ]}
        >
          <RNC.CalendarProvider date={day?.dateString || "2025-07-07"}>
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

      <RN.View
        style={{ paddingHorizontal: 16, marginTop: 12, marginBottom: 6 }}
      >
        <Text size={20} className="font-poppinsSemiBold text-black">
          Sexta, 27 de Dezembro
        </Text>

        <EventCard
          onPress={() => handleModalAction(bottomSheetModalRef, "present")}
        />
      </RN.View>

      <BaseBottomSheet ref={bottomSheetModalRef} indicatorColor={"redDark"}>
        <RN.View className="items-center px-8">
          <RN.View className="gap-2 items-center mb-6 mt-2">
            <Text size={20} className="font-poppinsSemiBold">
              Chamada - CJA (28/04/2028)
            </Text>

            <RN.View
              style={{ gap: 8, flexDirection: "row", alignItems: "center" }}
            >
              <Feather size={18} name="book-open" color={colors.black} />
              <Text size={18} className="font-poppinsMedium text-grayDark">
                Culto: Pregação
              </Text>
            </RN.View>

            <RN.View
              style={{ gap: 8, flexDirection: "row", alignItems: "center" }}
            >
              <Clock size={18} color={colors.black} />
              <Text size={18} className="font-poppinsMedium  text-grayDark">
                Horário: 19h30
              </Text>
            </RN.View>
          </RN.View>

          <RN.View className="w-full gap-3.5">
            <Button
              styleRest={{ height: getHeight * 0.05 }}
              onPress={() => {
                generatePDF();
              }}
            >
              <MaterialIcons
                name="picture-as-pdf"
                color={colors.white}
                size={22}
              />
              <Text size={14} className="font-poppinsSemiBold text-white">
                Visualizar chamada
              </Text>
            </Button>

            <Button
              bgColor="background"
              styleRest={{
                height: getHeight * 0.05,
              }}
            >
              <Pen strokeWidth={2.5} color={colors.primary} size={18} />
              <Text size={14} className="font-poppinsSemiBold text-primary">
                Editar chamada
              </Text>
            </Button>

            <Button
              bgColor="white"
              styleRest={{
                borderWidth: 1.5,
                borderColor: colors.redDark,
                height: getHeight * 0.05,
              }}
            >
              <Trash2 strokeWidth={2.5} color={colors.redDark} size={18} />
              <Text size={14} className="font-poppinsSemiBold text-redDark">
                Excluir chamada
              </Text>
            </Button>
          </RN.View>
        </RN.View>
      </BaseBottomSheet>

      <BaseBottomSheet
        withMorePaddingBottom={false}
        enableContentPanningGesture={false}
        indicatorColor="greenDark"
        ref={callPreviewModalRef}
        onDismiss={() => setPdfUri(null)}
      >
        <RN.View style={{ height: 600 }}>
          <Text className="font-poppinsSemiBold text-center" size={20}>
            Chamada - CJA (24/04/2025)
          </Text>

          {pdfUri && (
            <Pdf
              source={{ uri: pdfUri }}
              style={{
                flex: 1,
                marginTop: 10,
                marginHorizontal: 12,
              }}
            />
          )}

          <Button
            bgColor="background"
            styleRest={{
              borderRadius: 0,
              borderTopWidth: 1,
              borderColor: colors.grayLight,
            }}
            onPress={sharePDF}
          >
            <Share2 strokeWidth={2.5} color={colors.primary} />
            <Text size={18} className="font-poppinsBold text-primary">
              Compartilhar
            </Text>
          </Button>
        </RN.View>
      </BaseBottomSheet>
    </SafeAreaView>
  );
}
