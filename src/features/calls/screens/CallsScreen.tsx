import { useState, useEffect } from "react";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { htmlContent, ptBR } from "../utils/index";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Text,
  HeaderWithMenu,
  Button,
  BaseBottomSheet,
} from "@components/index";
import { EventCard } from "../components";
import { colors } from "@styles/colors";
import { Clock, Pen, Share2, Trash2 } from "lucide-react-native";
import styles from "../styles/CallsStyles";
import getHeight from "@utils/getHeight";
import Pdf from "react-native-pdf";
import * as RN from "react-native";
import * as RNC from "react-native-calendars";
import * as Print from "expo-print";
import * as Share from "expo-sharing";
import { useCalls } from "../hooks/useCalls";
import { EmptyCall } from "@assets/images";
import Toast from "@components/Toast/view";
import { useNavigation } from "@react-navigation/native";
import { useBottomSheet } from "@gorhom/bottom-sheet";
RNC.LocaleConfig.locales["pt-br"] = ptBR;
RNC.LocaleConfig.defaultLocale = "pt-br";

export default function CallScreen() {
  const [day, setDay] = useState<RNC.DateData>();
  const [currentMonthFormatted, setCurrentMonthFormatted] = useState("");

  const { navigate } = useNavigation();
  const [pdfUri, setPdfUri] = useState<string | null>(null);
  const [loadingEventPreview, setLoadingEventPreview] = useState(false);
  const {
    eventsBirthDate,
    showToastDelete,
    setShowToastDelete,
    dots,
    event,
    handleModalAction,
    getEventsByDateToCard,
    events,
    opennedCalendar,
    toggleCalendar,
    bottomSheetModalRef,
    callPreviewModalRef,
    validate,
    currentDateSelected,
    handleDeleteEvent,
    isLoadingDelete,
    handleGetEvent,
  } = useCalls();
  const calendarHeight = opennedCalendar ? 355 : 150;

  const currentMonth = new Date()
    .toLocaleDateString("pt-BR", { month: "long", year: "numeric" })
    .replace(" de ", " ")
    .replace(/^./, (letra) => letra.toUpperCase());

  const formatDateToBR = (date: string) => {
    const newDate = new Date(date);
    const formatted = newDate.toLocaleDateString("pt-BR");
    return formatted;
  };

  const generatePDF = async () => {
    setLoadingEventPreview(true);
    const { uri } = await Print.printToFileAsync({ html: htmlContent(event) });
    setPdfUri(uri);
    setTimeout(() => setLoadingEventPreview(false), 300);
  };

  useEffect(() => {
    if (pdfUri) validate();
  }, [pdfUri]);

  const sharePDF = async () => {
    await Share.shareAsync(pdfUri!);
  };

  const capitalize = (text: string) =>
    text.charAt(0).toUpperCase() + text.slice(1);

  const testData = () => {
    const [ano, mes, dia] = currentDateSelected?.split("-").map(Number);
    const data = new Date(ano, mes - 1, dia);

    const formatador = new Intl.DateTimeFormat("pt-BR", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });

    let resultado = formatador?.format(data);
    resultado = resultado.charAt(0).toUpperCase() + resultado.slice(1);
    resultado = resultado.replace("-feira", "");

    return resultado;
  };

  const calendarHeader = (
    <RN.View style={styles.calendarHeader}>
      <Feather size={24} color="#E8E8E8" name="calendar" />
      <RN.Text style={styles.calendarHeaderText}>
        {currentMonthFormatted ? currentMonthFormatted : currentMonth}
      </RN.Text>
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
      dotStyle: {
        width: 8,
        height: 8,
        borderRadius: 50,
      },
    },
    customHeaderTitle: calendarHeader,
    markedDates: day ? { [day.dateString]: { selected: true } } : undefined,
    /*     dayComponent: (props: { date?: RNC.DateData; state?: DayState }) => (
      <CalendarDay
        date={props?.date!}
        state={props?.state!}
        day={day!}
        setDay={setDay}
        test={getEventsByDateToCard}
      />
    ), */
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
          <RNC.CalendarProvider
            date={currentDateSelected}
            onMonthChange={(month) => {
              const date = new Date(month.year, month.month - 1);
              const raw = new Intl.DateTimeFormat("pt-BR", {
                month: "long",
                year: "numeric",
              }).format(date);

              const formatted = capitalize(raw.replace(" de ", " ")); // "Dezembro 2025"
              setCurrentMonthFormatted(formatted);
            }}
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
                  onDayPress={(day) => {
                    getEventsByDateToCard(day?.dateString);
                  }}
                  disablePan
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
                  },
                ]}
              >
                <RNC.Calendar
                  {...sharedCalendarProps}
                  onDayPress={({ dateString }) => {
                    getEventsByDateToCard(dateString);
                  }}
                  hideExtraDays
                  markingType="multi-dot"
                  markedDates={dots}
                  style={styles.calendar}
                />
              </RN.View>
            </RN.View>
          </RNC.CalendarProvider>
        </RN.Animated.View>

        <RN.TouchableOpacity
          style={styles.toggleButton}
          onPress={toggleCalendar}
        >
          <Feather
            size={28}
            color="#000000"
            name={opennedCalendar ? "chevron-up" : "chevron-down"}
          />
        </RN.TouchableOpacity>
      </RN.View>

      <RN.View
        style={{ paddingHorizontal: 16, marginTop: 14, marginBottom: 6 }}
      >
        {events?.length > 0 && (
          <Text size={20} className="font-poppinsSemiBold text-black">
            {testData()}
          </Text>
        )}

        <RN.View className="gap-1.5 mt-2">
          <RN.View className="gap-0.5 ">
            {events?.length > 0 ? (
              events.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onPress={() => handleGetEvent(event?.id)}
                />
              ))
            ) : (
              <RN.View className="items-center px-10">
                <RN.Image
                  source={EmptyCall}
                  style={{
                    width: 70,
                    height: 70,
                  }}
                  resizeMode="contain"
                />
                <Text className="font-poppinsSemiBold text-center text-black">
                  Nenhuma chamada registrada na {testData()}.
                </Text>
              </RN.View>
            )}
          </RN.View>

          <RN.View className="gap-3 mt-2">
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
                  <RN.Image
                    style={{ width: 44, height: 44, borderRadius: 22 }}
                    source={{ uri: event?.profileImage }}
                  />
                  <RN.View className="gap-1">
                    <Text className="font-poppinsSemiBold">
                      Aniversariante do dia! 🎉
                    </Text>
                    <Text className="font-poppins">{event?.name}</Text>
                  </RN.View>
                </RN.View>
              </RN.View>
            ))}
          </RN.View>
        </RN.View>
      </RN.View>

      <BaseBottomSheet
        ref={bottomSheetModalRef}
        indicatorColor={event?.type === "Saída" ? "redEvent" : "blueEvent"}
      >
        <RN.View className="items-center px-8">
          <RN.View className="gap-2 items-center mb-6 mt-2">
            <Text size={21} className="font-poppinsSemiBold">
              Chamada - CJA ({formatDateToBR(event?.date!)})
            </Text>

            <RN.View
              style={{ gap: 8, flexDirection: "row", alignItems: "center" }}
            >
              <Feather size={18} name="book-open" color={colors.black} />
              <Text size={18} className="font-poppinsMedium text-grayDark">
                Culto: {event?.cult}
              </Text>
            </RN.View>

            <RN.View
              style={{ gap: 8, flexDirection: "row", alignItems: "center" }}
            >
              <Clock size={18} color={colors.black} />
              <Text size={18} className="font-poppinsMedium  text-grayDark">
                Horário: {event?.hour}
              </Text>
            </RN.View>
          </RN.View>

          <RN.View className="w-full gap-3.5">
            <Button
              styleRest={{ height: getHeight * 0.05 }}
              activeLoading={loadingEventPreview}
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
              onPress={() => {
                handleModalAction(bottomSheetModalRef, "close");
                setTimeout(() => {
                  navigate("CallsNavigation", {
                    screen: "CreateCall",
                    params: {
                      event,
                    },
                  });
                }, 400);
              }}
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
              activeLoading={isLoadingDelete}
              onPress={() => handleDeleteEvent(event)}
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
            Chamada - CJA ({formatDateToBR(event?.date!)})
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

      <Toast
        message="Chamada excluída com sucesso!"
        visible={showToastDelete}
        onHide={() => setShowToastDelete(false)}
      />
    </SafeAreaView>
  );
}
