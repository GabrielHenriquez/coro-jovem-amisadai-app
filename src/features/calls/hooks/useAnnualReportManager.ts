import { useState, useMemo, useCallback, useEffect } from "react";
import { Log } from "@services/Logger";
import * as Hooks from "../hooks";
import { useEventsQueries } from "./useEventsQueries";

interface UseAnnualReportManagerProps {
  modalRef: React.RefObject<any>;
  control?: any;
}

export const useAnnualReportManager = ({
  modalRef,
  control,
}: UseAnnualReportManagerProps) => {
  const availableYears = useMemo(() => {
    const years: string[] = [];
    const current = new Date().getFullYear();
    const startYear = 2025;

    for (let year = current; year >= startYear; year--) {
      years.push(year.toString());
    }

    return years;
  }, []);

  const currentYear = useMemo(() => {
    const current = new Date().getFullYear();
    return current >= 2025 ? current.toString() : "2025";
  }, []);

  const [selectedYear, setSelectedYear] = useState<string>(() => {
    const current = new Date().getFullYear();
    return current >= 2025 ? current.toString() : "2025";
  });

  const [forceUpdate, setForceUpdate] = useState(0);

  const { getEventsQuery } = useEventsQueries();

  useEffect(() => {
    if (!control.watch || typeof control.watch !== "function") {
      const interval = setInterval(() => {
        try {
          if (control._formValues?.year) {
            const formYear = String(control._formValues.year).trim();
            if (formYear && formYear !== selectedYear) {
              setSelectedYear(formYear);
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
      if (name === "year" && value.year) {
        const formYear = String(value.year).trim();
        if (formYear !== selectedYear) {
          setSelectedYear(formYear);
          setForceUpdate((prev) => prev + 1);
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [control, selectedYear]);

  useEffect(() => {
    if (control && control._formValues?.year) {
      const formYear = String(control._formValues.year).trim();
      if (formYear && formYear !== selectedYear) {
        setSelectedYear(formYear);
        setForceUpdate((prev) => prev + 1);
      }
    }
  }, [control, selectedYear]);

  const eventsByYear = useMemo(() => {
    if (!getEventsQuery.data || !selectedYear) {
      return [];
    }

    const selectedYearStr = String(selectedYear).trim();

    const eventIds = getEventsQuery.data
      .filter((event) => {
        if (!event || !event.date) return false;

        try {
          const [eventYear] = event.date.split("-");
          return eventYear === selectedYearStr;
        } catch (error) {
          Log.error("Erro ao filtrar evento por ano:", error);
          return false;
        }
      })
      .map((event) => event?.id)
      .filter(Boolean) as string[];

    return eventIds;
  }, [getEventsQuery.data, selectedYear]);

  const hasEventsForYear = useMemo(
    () => selectedYear && eventsByYear && eventsByYear.length > 0,
    [selectedYear, eventsByYear]
  );

  const {
    pdfUri: missingComponentsPdfUri,
    loadingPdf: loadingMissingComponentsPdf,
    generateMissingComponentsPDF,
    sharePDF: shareMissingComponentsPdf,
    clearPdfUri: clearMissingComponentsPdfUri,
  } = Hooks.useAnnualMissingComponentsPdfManager({
    eventIds: eventsByYear || [],
    currentYear: selectedYear,
    modalRef: modalRef,
  });

  const handleGenerateReport = useCallback(async () => {
    Log.loading("Gerando relatório anual para:", selectedYear);

    try {
      await generateMissingComponentsPDF();
      Log.info("PDF gerado com sucesso!");
    } catch (error) {
      Log.error("Erro ao gerar PDF:", error);
    }
  }, [selectedYear, generateMissingComponentsPDF]);

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
    availableYears,
    currentYear,
    selectedYear,
    eventsByYear,
    missingComponentsPdfUri,
    loadingMissingComponentsPdf,
    hasEventsForYear,
    handleGenerateReport,
    handleShareReport,
    handleClearReport,
  };
};
