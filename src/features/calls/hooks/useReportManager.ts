import { useState, useMemo, useCallback, useEffect } from "react";
import { Log } from "@services/Logger";
import * as Hooks from "../hooks";
import { MONTHS, MonthValue, MonthLabel } from "../constants";

interface UseReportManagerProps {
  modalRef: React.RefObject<any>;
  control?: any;
}

export const useReportManager = ({
  modalRef,
  control,
}: UseReportManagerProps) => {
  Log.info("useReportManager inicializado", {
    hasControl: !!control,
    hasWatch: !!control?.watch,
  });

  const months = useMemo(() => MONTHS, []);

  const currentYear = useMemo(() => new Date().getFullYear().toString(), []);

  const currentMonth = useMemo(() => {
    const now = new Date();
    const monthIndex = now.getMonth();
    return months[monthIndex];
  }, [months]);

  const [selectedMonth, setSelectedMonth] = useState<MonthValue>(() => {
    return currentMonth.value;
  });

  const [forceUpdate, setForceUpdate] = useState(0);

  useEffect(() => {
    if (!control.watch || typeof control.watch !== "function") {
      Log.info("Control.watch não disponível, usando verificação periódica");

      const interval = setInterval(() => {
        try {
          if (control._formValues?.month) {
            const monthObj = months.find(
              (m) => m.label === control._formValues.month
            );
            if (monthObj && monthObj.value !== selectedMonth) {
              Log.info("Mês detectado via _formValues:", monthObj.value);
              setSelectedMonth(monthObj.value);
              setForceUpdate((prev) => prev + 1);
            }
          }
        } catch (error) {
          Log.error("Erro na verificação periódica:", error);
        }
      }, 500);

      return () => clearInterval(interval);
    }

    const subscription = control.watch((value: any, { name }: any) => {
      Log.info("Formulário mudou:", { name, value });

      if (name === "month" && value.month) {
        const monthObj = months.find((m) => m.label === value.month);
        if (monthObj && monthObj.value !== selectedMonth) {
          Log.info("Mês selecionado via formulário:", monthObj.value);
          setSelectedMonth(monthObj.value);
          setForceUpdate((prev) => prev + 1);
        }
      }
    });

    return () => {
      Log.info("Limpando subscription");
      subscription.unsubscribe();
    };
  }, [control, months, selectedMonth]);

  const formattedMonth = useMemo(() => {
    if (!selectedMonth) return "";
    const monthObj = months.find((m) => m.value === selectedMonth);
    return monthObj ? `${monthObj.label} ${currentYear}` : "";
  }, [selectedMonth, months, currentYear]);

  const { eventsByMonth } = Hooks.useCalls(formattedMonth || undefined);

  useEffect(() => {
    Log.info("Estado atual:", {
      selectedMonth,
      formattedMonth,
      eventsByMonth: eventsByMonth?.length,
    });
  }, [selectedMonth, formattedMonth, eventsByMonth, forceUpdate]);

  const {
    pdfUri: missingComponentsPdfUri,
    loadingPdf: loadingMissingComponentsPdf,
    generateMissingComponentsPDF,
    sharePDF: shareMissingComponentsPdf,
    clearPdfUri: clearMissingComponentsPdfUri,
  } = Hooks.useMissingComponentsPdfManager({
    eventIds: eventsByMonth || [],
    currentMonth: formattedMonth,
    modalRef,
  });

  const hasEventsForMonth = useMemo(
    () => selectedMonth && eventsByMonth && eventsByMonth.length > 0,
    [selectedMonth, eventsByMonth]
  );

  const refreshData = useCallback(() => {
    setForceUpdate((prev) => prev + 1);
    Log.info("Forçando atualização dos dados");
  }, []);

  const forceRefreshOnMonthChange = useCallback(() => {
    Log.info("Forçando atualização por mudança de mês");
    setForceUpdate((prev) => prev + 1);
  }, []);

  useEffect(() => {
    forceRefreshOnMonthChange();
  }, [selectedMonth, forceRefreshOnMonthChange]);

  useEffect(() => {
    if (control && control._formValues?.month) {
      const monthObj = months.find(
        (m) => m.label === control._formValues.month
      );
      if (monthObj && monthObj.value !== selectedMonth) {
        Log.info("Sincronização inicial:", monthObj.value);
        setSelectedMonth(monthObj.value);
      }
    }
  }, [control, months, selectedMonth]);

  const handleMonthChange = useCallback(
    (monthLabel: MonthLabel) => {
      const monthObj = months.find((m) => m.label === monthLabel);
      if (monthObj) {
        setSelectedMonth(monthObj.value);
        Log.info("Mês selecionado:", monthObj.value);
      }
    },
    [months]
  );

  const handleGenerateReport = useCallback(async () => {
    Log.loading("Gerando relatório para:", selectedMonth);

    try {
      await generateMissingComponentsPDF();
      Log.info("PDF gerado com sucesso!");
    } catch (error) {
      Log.error("Erro ao gerar PDF:", error);
    }
  }, [selectedMonth, generateMissingComponentsPDF]);

  const handleShareReport = useCallback(() => {
    try {
      shareMissingComponentsPdf();
    } catch (error) {
      Log.error("Erro ao compartilhar PDF:", error);
    }
  }, [shareMissingComponentsPdf]);

  const handleClearReport = useCallback(() => {
    try {
      clearMissingComponentsPdfUri();
    } catch (error) {
      Log.error("Erro ao limpar PDF:", error);
    }
  }, [clearMissingComponentsPdfUri]);

  return {
    months: [...months],
    currentYear,
    currentMonth: currentMonth.label,
    selectedMonth,
    eventsByMonth,
    formattedMonth,
    missingComponentsPdfUri,
    loadingMissingComponentsPdf,
    hasEventsForMonth,
    handleMonthChange,
    handleGenerateReport,
    handleShareReport,
    handleClearReport,
    refreshData,
  };
};
