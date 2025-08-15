import { useState, useCallback, useEffect } from "react";
import * as Print from "expo-print";
import * as Share from "expo-sharing";
import { htmlContent } from "../utils";

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
      setPdfUri(uri);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setTimeout(() => setLoadingEventPreview(false), 300);
    }
  }, [event]);

  const sharePDF = useCallback(async () => {
    if (!pdfUri) return;

    try {
      await Share.shareAsync(pdfUri);
    } catch (error) {
      console.error("Error sharing PDF:", error);
    }
  }, [pdfUri]);

  useEffect(() => {
    if (pdfUri) validate();
  }, [pdfUri, validate]);

  const clearPdfUri = useCallback(() => {
    setPdfUri(null);
  }, []);

  return {
    pdfUri,
    loadingEventPreview,
    generatePDF,
    sharePDF,
    clearPdfUri,
  };
};
