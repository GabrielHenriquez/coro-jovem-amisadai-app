import React from "react";
import { Share2 } from "lucide-react-native";
import { Button, Text, BaseBottomSheet } from "@components/index";
import { colors } from "@styles/colors";
import Pdf from "react-native-pdf";
import * as RN from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { formatDateToBR } from "@utils/date";

interface PdfPreviewModalProps {
  callPreviewModalRef: React.RefObject<BottomSheetModal | null>;
  pdfUri: string | null;
  event: any;
  onDismiss: () => void;
  onShare: () => void;
}

const PdfPreviewModal: React.FC<PdfPreviewModalProps> = ({
  callPreviewModalRef,
  pdfUri,
  event,
  onDismiss,
  onShare,
}) => {
  const hasEvent = event && event.date;
  const getTitle = () => {
    if (event && event.date)
      return `Chamada - CJA (${formatDateToBR(event.date)})`;
  };

  return (
    <BaseBottomSheet
      withMorePaddingBottom={false}
      enableContentPanningGesture={false}
      indicatorColor="greenDark"
      ref={callPreviewModalRef}
      onDismiss={onDismiss}
    >
      <RN.View style={{ height: 600 }}>
        {event && event.date && (
          <Text className="font-poppinsSemiBold text-center" size={20}>
            {getTitle()}
          </Text>
        )}

        {pdfUri && (
          <Pdf
            source={{ uri: pdfUri }}
            style={{
              flex: 1,
              marginTop: hasEvent ? 10 : 0,
              marginHorizontal: 12,
            }}
          />
        )}

        <Button
          bgColor="background"
          styleRest={{
            borderRadius: 0,
            borderTopWidth: 1,
            borderColor: colors.grayLight,
          }}
          onPress={onShare}
        >
          <Share2 strokeWidth={2.5} color={colors.primary} />
          <Text size={18} className="font-poppinsBold text-primary">
            Compartilhar
          </Text>
        </Button>
      </RN.View>
    </BaseBottomSheet>
  );
};

export default React.memo(PdfPreviewModal);
