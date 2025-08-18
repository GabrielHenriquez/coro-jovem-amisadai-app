import React, { useRef, useState, useEffect } from "react";
import { View as RNView } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";

import { Button, Header, Text } from "@components/index";
import * as Components from "../components";
import * as Hooks from "../hooks";
import useFormReport from "../hooks/forms/useFormReport";
import CallsStyles from "../styles/CallsStyles";

const ReportsScreen: React.FC = () => {
  const navigation = useNavigation();
  const missingComponentsPdfModalRef = useRef<BottomSheetModal | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

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

  useEffect(() => {
    setRefreshKey((prev) => prev + 1);
  }, [selectedMonth]);

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
            Relatório de Faltas Mensais
          </Text>
          <Text className="font-poppinsRegular text-gray-500 text-center">
            Analise a frequência de faltas por período
          </Text>
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
            onPress={handleSubmit(handleGenerateReport)}
            disabled={
              !selectedMonth ||
              loadingMissingComponentsPdf ||
              !hasEventsForMonth
            }
            activeLoading={loadingMissingComponentsPdf}
          >
            <Text className="font-poppinsSemiBold text-white">
              {loadingMissingComponentsPdf
                ? "Gerando Relatório..."
                : "Gerar Relatório"}
            </Text>
          </Button>
        </RNView>
      </RNView>

      <Components.MissingComponentsPdfModal
        bottomSheetModalRef={missingComponentsPdfModalRef}
        pdfUri={missingComponentsPdfUri}
        onDismiss={handleClearReport}
        onShare={handleShareReport}
      />
    </RNView>
  );
};

export default ReportsScreen;
