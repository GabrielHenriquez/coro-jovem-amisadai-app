import { useState, useCallback, useEffect, useMemo } from "react";
import * as Print from "expo-print";
import * as Share from "expo-sharing";
import annualMissingComponentsHtmlContent, {
  MissingComponentsData,
} from "../utils/annualMissingComponentsHtmlContent";
import { MissingComponentWithCount } from "../utils/missingComponentsHtmlContent";
import { IEvent } from "../domain/entities/Events";
import { Log } from "@services/Logger";
import { useEventsQueries } from "./useEventsQueries";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { generateAnnualReportPdfFileName } from "../utils/pdfFileNameGenerator";
import { renamePdfFile } from "../utils/renamePdfFile";

interface UseAnnualMissingComponentsPdfManagerProps {
  eventIds: string[];
  currentYear: string;
  modalRef?: React.RefObject<BottomSheetModal | null>;
}

export const useAnnualMissingComponentsPdfManager = ({
  eventIds,
  currentYear,
  modalRef,
}: UseAnnualMissingComponentsPdfManagerProps) => {
  const [pdfUri, setPdfUri] = useState<string | null>(null);
  const [loadingPdf, setLoadingPdf] = useState(false);
  const { repository } = useEventsQueries();

  const sortByFaultCount = useCallback(
    (a: MissingComponentWithCount, b: MissingComponentWithCount) =>
      b.count - a.count,
    []
  );

  const classifySuit = useCallback((suit: string) => {
    const lowerSuit = suit.toLowerCase();
    if (
      lowerSuit.includes("soprano") ||
      lowerSuit.includes("1º soprano") ||
      lowerSuit.includes("2º soprano")
    ) {
      return "soprano";
    } else if (lowerSuit.includes("contralto")) {
      return "contralto";
    } else if (
      lowerSuit.includes("tenor") ||
      lowerSuit.includes("1º tenor") ||
      lowerSuit.includes("2º tenor")
    ) {
      return "tenor";
    } else if (lowerSuit.includes("baixo") || lowerSuit.includes("barítono")) {
      return "baixo";
    }
    return null;
  }, []);

  useEffect(() => {
    if (pdfUri && modalRef?.current) {
      try {
        Log.info("Tentando abrir modal automaticamente", {
          pdfUri,
          hasModalRef: !!modalRef.current,
        });

        const timeoutId = setTimeout(() => {
          if (modalRef?.current) {
            try {
              modalRef.current.present();
              Log.success("Modal aberto automaticamente após geração do PDF");
            } catch (presentError) {
              Log.error("Erro ao chamar present() no modal:", presentError);
            }
          }
        }, 200);

        return () => clearTimeout(timeoutId);
      } catch (error) {
        Log.error("Erro ao abrir modal:", error);
      }
    }
  }, [pdfUri, modalRef]);

  const generateMissingComponentsPDF = useCallback(async () => {
    if (!eventIds || eventIds.length === 0) {
      Log.warning("Nenhum evento encontrado para gerar o relatório");
      return;
    }

    setLoadingPdf(true);
    try {
      const eventPromises = eventIds.map(async (eventId) => {
        try {
          const event = await repository.getEvent(eventId);
          return event && "id" in event ? (event as IEvent) : null;
        } catch (error) {
          Log.warning(`Erro ao buscar evento ${eventId}:`, error);
          return null;
        }
      });

      const eventResults = await Promise.all(eventPromises);
      const events = eventResults.filter(
        (event): event is IEvent => event !== null
      );

      if (events.length === 0) {
        Log.warning("Nenhum evento válido encontrado para gerar o relatório");
        return;
      }

      const allMissingComponents = events.flatMap(
        (event) => event.missingComponents || []
      );

      const componentFaultCount = new Map<
        string,
        { component: any; count: number }
      >();

      allMissingComponents.forEach((component) => {
        if (!component || !component.id) return;

        const existing = componentFaultCount.get(component.id);
        if (existing) {
          existing.count += 1;
        } else {
          componentFaultCount.set(component.id, { component, count: 1 });
        }
      });

      const naipeGroups = {
        soprano: [] as MissingComponentWithCount[],
        contralto: [] as MissingComponentWithCount[],
        tenor: [] as MissingComponentWithCount[],
        baixo: [] as MissingComponentWithCount[],
      };

      componentFaultCount.forEach(({ component, count }) => {
        const suitType = classifySuit(component.suit);
        if (suitType && naipeGroups[suitType as keyof typeof naipeGroups]) {
          naipeGroups[suitType as keyof typeof naipeGroups].push({
            component,
            count,
          });
        }
      });

      const sortedSoprano = naipeGroups.soprano.sort(sortByFaultCount);
      const sortedContralto = naipeGroups.contralto.sort(sortByFaultCount);
      const sortedTenor = naipeGroups.tenor.sort(sortByFaultCount);
      const sortedBaixo = naipeGroups.baixo.sort(sortByFaultCount);

      const totalMissing =
        sortedSoprano.length +
        sortedContralto.length +
        sortedTenor.length +
        sortedBaixo.length;

      const missingComponentsData: MissingComponentsData = {
        year: currentYear,
        totalMissing,
        soprano: sortedSoprano,
        contralto: sortedContralto,
        eventsLength: events.length,
        tenor: sortedTenor,
        baixo: sortedBaixo,
      };

      if (!missingComponentsData.year) {
        Log.error("Dados inválidos para geração do PDF", missingComponentsData);
        return;
      }

      try {
        const { uri } = await Print.printToFileAsync({
          html: annualMissingComponentsHtmlContent(missingComponentsData),
        });

        Log.info("PDF gerado com sucesso, renomeando arquivo", { uri });

        const fileName = generateAnnualReportPdfFileName("faltas", currentYear);
        const renamedUri = await renamePdfFile(uri, fileName);

        if (renamedUri) {
          setPdfUri(renamedUri);
          Log.success(
            "PDF de componentes faltosos anual gerado e renomeado com sucesso",
            {
              uri: renamedUri,
            }
          );
        } else {
          setPdfUri(uri);
          Log.success("PDF de componentes faltosos anual gerado com sucesso", {
            uri,
          });
        }
      } catch (error) {
        Log.error("Erro ao gerar PDF de componentes faltosos anual:", error);
      } finally {
        setLoadingPdf(false);
      }
    } catch (error) {
      Log.error("Erro ao gerar PDF de componentes faltosos anual:", error);
    } finally {
      setLoadingPdf(false);
    }
  }, [eventIds, currentYear, repository, sortByFaultCount, classifySuit]);

  const sharePDF = useCallback(async () => {
    if (!pdfUri) return;

    try {
      await Share.shareAsync(pdfUri);
    } catch (error) {
      Log.error("Erro ao compartilhar PDF:", error);
    }
  }, [pdfUri]);

  const clearPdfUri = useCallback(() => setPdfUri(null), []);

  return {
    pdfUri,
    loadingPdf,
    generateMissingComponentsPDF,
    sharePDF,
    clearPdfUri,
  };
};

