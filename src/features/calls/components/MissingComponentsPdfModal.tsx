import React from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { PdfPreviewModal } from "./index";
import { Log } from "@services/index";

interface MissingComponentsPdfModalProps {
  bottomSheetModalRef: React.RefObject<BottomSheetModal | null>;
  pdfUri: string | null;
  onDismiss: () => void;
  onShare: () => void;
}

const MissingComponentsPdfModal: React.FC<MissingComponentsPdfModalProps> = ({
  bottomSheetModalRef,
  pdfUri,
  onDismiss,
  onShare,
}) => {
  const handleDismiss = () => {
    try {
      onDismiss();
    } catch (error) {
      Log.error("Erro ao fechar modal:", error);
    }
  };

  const handleShare = () => {
    try {
      onShare();
    } catch (error) {
      Log.error("Erro ao compartilhar:", error);
    }
  };

  return (
    <PdfPreviewModal
      callPreviewModalRef={bottomSheetModalRef}
      pdfUri={pdfUri}
      event={null}
      onDismiss={handleDismiss}
      onShare={handleShare}
    />
  );
};

export default MissingComponentsPdfModal;
