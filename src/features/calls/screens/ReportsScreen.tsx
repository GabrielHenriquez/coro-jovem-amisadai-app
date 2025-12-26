import React, { useRef, useState, useEffect, useMemo } from "react";
import { View as RNView, TouchableOpacity } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";

import { Button, Header, Text } from "@components/index";
import * as Components from "../components";
import * as Hooks from "../hooks";
import useFormReport from "../hooks/forms/useFormReport";
import CallsStyles from "../styles/CallsStyles";
import { colors } from "@styles/colors";

type ReportType = "faltas" | "presenças";

const ReportsScreen: React.FC = () => {
  const navigation = useNavigation();
  const missingComponentsPdfModalRef = useRef<BottomSheetModal | null>(null);
  const presenceComponentsPdfModalRef = useRef<BottomSheetModal | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [reportType, setReportType] = useState<ReportType>("faltas");

  const { control, handleSubmit, errors } = useFormReport();

  const {
    months,
    currentYear,
    selectedMonth,
    eventsByMonth,
    missingComponentsPdfUri,
    loadingMissingComponentsPdf,
    hasEventsForMonth,
    handleGenerateReport,
    handleShareReport,
    handleClearReport,
  } = Hooks.useReportManager({
    modalRef: missingComponentsPdfModalRef,
    control,
  });

  const formattedMonth = useMemo(() => {
    if (!selectedMonth) return "";
    const monthObj = months.find((m) => m.value === selectedMonth);
    return monthObj ? `${monthObj.label} ${currentYear}` : "";
  }, [selectedMonth, months, currentYear]);

  const {
    pdfUri: presenceComponentsPdfUri,
    loadingPdf: loadingPresenceComponentsPdf,
    generatePresenceComponentsPDF,
    sharePDF: sharePresenceComponentsPdf,
    clearPdfUri: clearPresenceComponentsPdfUri,
  } = Hooks.usePresenceComponentsPdfManager({
    eventIds: eventsByMonth || [],
    currentMonth: formattedMonth,
    modalRef: presenceComponentsPdfModalRef,
  });

  useEffect(() => {
    setRefreshKey((prev) => prev + 1);
  }, [selectedMonth]);

  const handleGeneratePresenceReport = async () => {
    await generatePresenceComponentsPDF();
  };

  const handleSharePresenceReport = () => {
    sharePresenceComponentsPdf();
  };

  const handleClearPresenceReport = () => {
    clearPresenceComponentsPdfUri();
  };

  const isMissingReport = reportType === "faltas";
  const currentPdfUri = isMissingReport
    ? missingComponentsPdfUri
    : presenceComponentsPdfUri;
  const currentLoading = isMissingReport
    ? loadingMissingComponentsPdf
    : loadingPresenceComponentsPdf;
  const currentModalRef = isMissingReport
    ? missingComponentsPdfModalRef
    : presenceComponentsPdfModalRef;
  const currentHandleGenerate = isMissingReport
    ? handleGenerateReport
    : handleGeneratePresenceReport;
  const currentHandleShare = isMissingReport
    ? handleShareReport
    : handleSharePresenceReport;
  const currentHandleClear = isMissingReport
    ? handleClearReport
    : handleClearPresenceReport;

  return (
    <RNView style={CallsStyles.container}>
      <Header
        bgColor="primary"
        onPressBack={() => navigation.goBack()}
        color="white"
        title="Relatórios"
      />

      <RNView className="gap-4 px-5 mt-6">
        <RNView className="gap-3">
          <Text size={22} className="font-poppinsBold text-black text-center">
            Relatórios Mensais
          </Text>
          <Text className="font-poppinsRegular text-gray-500 text-center">
            Analise a frequência por período
          </Text>
        </RNView>

        <RNView
          style={{
            flexDirection: "row",
            gap: 10,
            marginBottom: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => setReportType("faltas")}
            style={{
              flex: 1,
              paddingVertical: 12,
              paddingHorizontal: 16,
              borderRadius: 8,
              backgroundColor: reportType === "faltas" ? colors.primary : "#f0f0f0",
              borderWidth: 1,
              borderColor: reportType === "faltas" ? colors.primary : "#ddd",
            }}
          >
            <Text
              className="font-poppinsSemiBold text-center"
              style={{ color: reportType === "faltas" ? "white" : "#666" }}
            >
              Faltas
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setReportType("presenças")}
            style={{
              flex: 1,
              paddingVertical: 12,
              paddingHorizontal: 16,
              borderRadius: 8,
              backgroundColor:
                reportType === "presenças" ? colors.primary : "#f0f0f0",
              borderWidth: 1,
              borderColor: reportType === "presenças" ? colors.primary : "#ddd",
            }}
          >
            <Text
              className="font-poppinsSemiBold text-center"
              style={{ color: reportType === "presenças" ? "white" : "#666" }}
            >
              Presenças
            </Text>
          </TouchableOpacity>
        </RNView>

        <Components.PeriodSelector
          months={months}
          currentYear={currentYear}
          control={control}
          errors={errors}
        />

        {selectedMonth && (
          <Components.EventStatusCard
            key={refreshKey}
            eventsByMonth={eventsByMonth}
          />
        )}

        <RNView style={{ marginTop: 5 }}>
          <Button
            onPress={handleSubmit(currentHandleGenerate)}
            disabled={!selectedMonth || currentLoading || !hasEventsForMonth}
            activeLoading={currentLoading}
          >
            <Text className="font-poppinsSemiBold text-white">
              {currentLoading
                ? "Gerando Relatório..."
                : `Gerar Relatório de ${reportType === "faltas" ? "Faltas" : "Presenças"}`}
            </Text>
          </Button>
        </RNView>
      </RNView>

      {isMissingReport ? (
        <Components.MissingComponentsPdfModal
          bottomSheetModalRef={currentModalRef}
          pdfUri={currentPdfUri}
          onDismiss={currentHandleClear}
          onShare={currentHandleShare}
        />
      ) : (
        <Components.PresenceComponentsPdfModal
          bottomSheetModalRef={currentModalRef}
          pdfUri={currentPdfUri}
          onDismiss={currentHandleClear}
          onShare={currentHandleShare}
        />
      )}
    </RNView>
  );
};

export default ReportsScreen;
