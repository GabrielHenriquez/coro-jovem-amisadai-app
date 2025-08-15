import React, { useMemo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderWithMenu } from "@components/index";
import styles from "../styles/CallsStyles";
import * as RN from "react-native";
import * as RNC from "react-native-calendars";
import {
  useCalls,
  useMonthFormatting,
  usePdfManager,
  useEventActions,
  useDateFormatter,
} from "../hooks";
import Toast from "@components/Toast/view";
import {
  CalendarSection,
  EventsList,
  BirthDatesList,
  EventMenu,
  PdfPreviewModal,
  DeleteConfirmationModal,
} from "../components";
import { useToastStore } from "../stores/useToastStore";

RNC.LocaleConfig.locales["pt-br"] = require("../utils/localeConfig").default;
RNC.LocaleConfig.defaultLocale = "pt-br";

export default function CallScreen() {
  const { message, visible, onHide } = useToastStore();

  const {
    eventsBirthDate,
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
    handleDeleteEvent,
    isLoadingDelete,
    visibleModalDelete,
    setVisibleModalDelete,
    handleGetEvent,
    selectedDate,
    loadingData,
    getBirthDatesQuery,
  } = useCalls();

  // Use the optimized month formatting hook
  const { currentMonth, currentMonthFormatted, handleMonthChange } =
    useMonthFormatting();

  // Use the PDF manager hook
  const { pdfUri, loadingEventPreview, generatePDF, sharePDF, clearPdfUri } =
    usePdfManager({
      event,
      validate,
    });

  // Use the event actions hook
  const { handleEditCall, handleDeleteCall, handleOpenModalDelete } =
    useEventActions({
      event,
      handleModalAction,
      bottomSheetModalRef,
      handleDeleteEvent,
      setVisibleModalDelete,
    });

  // Use the date formatter hook
  const { currentDateDisplay } = useDateFormatter(selectedDate);

  const calendarHeight = useMemo(
    () => (opennedCalendar ? 370 : 155),
    [opennedCalendar]
  );

  return (
    <SafeAreaView style={styles.container}>
      <RN.StatusBar translucent backgroundColor="#4C5E46" />

      <RN.View style={styles.header}>
        <HeaderWithMenu />
        <CalendarSection
          handleMonthChange={handleMonthChange}
          opennedCalendar={opennedCalendar}
          calendarHeight={calendarHeight}
          selectedDate={selectedDate!}
          dots={dots}
          getEventsByDateToCard={getEventsByDateToCard}
          toggleCalendar={toggleCalendar}
          currentMonthFormatted={currentMonthFormatted}
          currentMonth={currentMonth}
        />
      </RN.View>

      <RN.View
        style={{ paddingHorizontal: 16, marginTop: 14, marginBottom: 6 }}
      >
        <RN.View className="gap-3 mt-2">
          <EventsList
            loadingData={loadingData}
            events={events}
            currentDateDisplay={currentDateDisplay}
            handleGetEvent={handleGetEvent}
          />

          <BirthDatesList
            getBirthDatesQuery={getBirthDatesQuery}
            eventsBirthDate={eventsBirthDate}
          />
        </RN.View>
      </RN.View>

      <EventMenu
        bottomSheetModalRef={bottomSheetModalRef}
        event={event}
        loadingEventPreview={loadingEventPreview}
        generatePDF={generatePDF}
        handleEditCall={handleEditCall}
        handleOpenModalDelete={handleOpenModalDelete}
      />

      <PdfPreviewModal
        callPreviewModalRef={callPreviewModalRef}
        pdfUri={pdfUri}
        event={event}
        onDismiss={clearPdfUri}
        onShare={sharePDF}
      />

      <DeleteConfirmationModal
        visible={visibleModalDelete}
        onClose={() => setVisibleModalDelete(false)}
        onConfirm={handleDeleteCall}
        isLoading={isLoadingDelete}
      />

      <Toast message={message} visible={visible} onHide={onHide} />
    </SafeAreaView>
  );
}
