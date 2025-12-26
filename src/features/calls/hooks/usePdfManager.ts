import { useState, useCallback, useEffect } from "react";
import * as Print from "expo-print";
import * as Share from "expo-sharing";
import htmlContent from "../utils/htmlContent";
import { Log } from "@services/Logger";
import { generateCallPdfFileName } from "../utils/pdfFileNameGenerator";
import { renamePdfFile } from "../utils/renamePdfFile";

interface UsePdfManagerProps {
  event: any;
  validate: () => void;
}

export const usePdfManager = ({ event, validate }: UsePdfManagerProps) => {
  const [pdfUri, setPdfUri] = useState<string | null>(null);
  const [loadingEventPreview, setLoadingEventPreview] = useState(false);

  const generatePDF = useCallback(async () => {
    if (!event) return;

    setLoadingEventPreview(true);
    try {
      const { uri } = await Print.printToFileAsync({
        html: htmlContent(event),
      });

      Log.info("PDF gerado com sucesso, renomeando arquivo", { uri });

      const fileName = generateCallPdfFileName(event);
      const renamedUri = await renamePdfFile(uri, fileName);

      if (renamedUri) {
        setPdfUri(renamedUri);
        Log.success("PDF de chamada gerado e renomeado com sucesso", {
          uri: renamedUri,
        });
      } else {
        setPdfUri(uri);
        Log.success("PDF de chamada gerado com sucesso", { uri });
      }
    } catch (error) {
      Log.error("Error generating PDF:", error);
    } finally {
      setTimeout(() => setLoadingEventPreview(false), 300);
    }
  }, [event]);

  const sharePDF = useCallback(async () => {
    if (!pdfUri) return;

    try {
      await Share.shareAsync(pdfUri);
    } catch (error) {
      Log.error("Error sharing PDF:", error);
    }
  }, [pdfUri]);

  useEffect(() => {
    if (pdfUri) validate();
  }, [pdfUri, validate]);

  const clearPdfUri = useCallback(() => setPdfUri(null), []);

  return {
    pdfUri,
    loadingEventPreview,
    generatePDF,
    sharePDF,
    clearPdfUri,
  };
};
