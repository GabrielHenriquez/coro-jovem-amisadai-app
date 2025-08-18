import React, { useMemo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderWithMenu } from "@components/index";
import { useToastStore } from "../stores/useToastStore";
import * as RN from "react-native";
import * as RNC from "react-native-calendars";
import * as Hooks from "../hooks";
import * as Components from "../components";
import Toast from "@components/Toast/view";

import { Text } from "@components/index";
import styles from "../styles/CallsStyles";

RNC.LocaleConfig.locales["pt-br"] = require("../constants/localeConfig").default;
RNC.LocaleConfig.defaultLocale = "pt-br";

export default function CallScreen() {
  const { message, visible, onHide } = useToastStore();
  const { currentMonth, currentMonthFormatted, handleMonthChange } =
    Hooks.useMonthFormatting();
  const ViewModel = Hooks.useCalls(currentMonth);
  const { currentDateDisplay } = Hooks.useDateFormatter(ViewModel.selectedDate);

  const { pdfUri, loadingEventPreview, generatePDF, sharePDF, clearPdfUri } =
    Hooks.usePdfManager({
      event: ViewModel.event,
      validate: ViewModel.validate,
    });

  const { handleEditCall, handleDeleteCall, handleOpenModalDelete } =
    Hooks.useEventActions({
      event: ViewModel.event,
      handleModalAction: ViewModel.handleModalAction,
      bottomSheetModalRef: ViewModel.bottomSheetRef,
      handleDeleteEvent: ViewModel.handleDeleteEvent,
      setVisibleModalDelete: ViewModel.setVisibleModalDelete,
    });

  const calendarHeight = useMemo(
    () => (ViewModel.opennedCalendar ? 370 : 155),
    [ViewModel.opennedCalendar]
  );

  return (
    <SafeAreaView style={styles.container}>
      <RN.StatusBar translucent backgroundColor="#4C5E46" />

      <RN.View style={styles.header}>
        <HeaderWithMenu />
        <Components.CalendarSection
          handleMonthChange={handleMonthChange}
          opennedCalendar={ViewModel.opennedCalendar}
          calendarHeight={calendarHeight}
          selectedDate={ViewModel.selectedDate!}
          dots={ViewModel.dots}
          getEventsByDateToCard={ViewModel.getEventsByDateToCard}
          toggleCalendar={ViewModel.toggleCalendar}
          currentMonthFormatted={currentMonthFormatted}
          currentMonth={currentMonth}
        />
      </RN.View>

      <RN.View
        style={{ paddingHorizontal: 16, marginTop: 20, marginBottom: 6 }}
      >
        {(ViewModel.events.length > 0 ||
          ViewModel.eventsBirthDate.length > 0) && (
          <Text size={20} className="font-poppinsSemiBold text-black">
            {currentDateDisplay}
          </Text>
        )}

        <RN.View className="mt-4 gap-3">
          <Components.BirthDatesList
            getBirthDatesQuery={ViewModel.getBirthDatesQuery}
            eventsBirthDate={ViewModel.eventsBirthDate}
          />

          <Components.EventsList
            loadingData={ViewModel.loadingData}
            events={ViewModel.events}
            currentDateDisplay={currentDateDisplay}
            hasBirthDates={ViewModel.eventsBirthDate.length > 0}
            handleGetEvent={ViewModel.handleGetEvent}
          />
        </RN.View>
      </RN.View>

      <Components.EventMenu
        bottomSheetModalRef={ViewModel.bottomSheetRef}
        event={ViewModel.event}
        loadingEventPreview={loadingEventPreview}
        generatePDF={generatePDF}
        handleEditCall={handleEditCall}
        handleOpenModalDelete={handleOpenModalDelete}
      />

      <Components.PdfPreviewModal
        callPreviewModalRef={ViewModel.callPreviewModalRef}
        pdfUri={pdfUri}
        event={ViewModel.event}
        onDismiss={clearPdfUri}
        onShare={sharePDF}
      />

      <Components.DeleteConfirmationModal
        visible={ViewModel.visibleModalDelete}
        onClose={() => ViewModel.setVisibleModalDelete(false)}
        onConfirm={handleDeleteCall}
        isLoading={ViewModel.isLoadingDelete}
      />

      <Toast message={message} visible={visible} onHide={onHide} />
    </SafeAreaView>
  );
}
