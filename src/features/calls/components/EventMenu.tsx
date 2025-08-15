import React from "react";
import { Feather } from "@expo/vector-icons";
import { Text, BaseBottomSheet } from "@components/index";
import { colors } from "@styles/colors";
import { Clock } from "lucide-react-native";
import * as RN from "react-native";
import { formatDateToBR } from "@features/members/utils/formatDate";
import EventActions from "./EventActions";

interface EventMenuProps {
  bottomSheetModalRef: React.RefObject<any>;
  event: any;
  loadingEventPreview: boolean;
  generatePDF: () => void;
  handleEditCall: () => void;
  handleOpenModalDelete: () => void;
}

const EventMenu: React.FC<EventMenuProps> = ({
  bottomSheetModalRef,
  event,
  loadingEventPreview,
  generatePDF,
  handleEditCall,
  handleOpenModalDelete,
}) => (
  <BaseBottomSheet
    ref={bottomSheetModalRef}
    indicatorColor={event?.type === "Saída" ? "redEvent" : "blueEvent"}
  >
    <RN.View className="items-center px-8">
      <RN.View className="gap-2 items-center mb-6 mt-2">
        <Text size={21} className="font-poppinsSemiBold">
          Chamada - CJA ({formatDateToBR(event?.date!)})
        </Text>

        <Text
          size={16}
          className="font-poppinsMedium text-grayDark text-center items-center"
        >
          <Feather size={16} name="book-open" color={colors.black} />
          {"  "}
          Culto: {event?.cult}
        </Text>

        <RN.View
          style={{ gap: 8, flexDirection: "row", alignItems: "center" }}
        >
          <Clock size={16} color={colors.black} />
          <Text size={16} className="font-poppinsMedium  text-grayDark">
            Horário: {event?.hour}
          </Text>
        </RN.View>
      </RN.View>

      <EventActions
        event={event}
        loadingEventPreview={loadingEventPreview}
        generatePDF={generatePDF}
        handleEditCall={handleEditCall}
        handleOpenModalDelete={handleOpenModalDelete}
      />
    </RN.View>
  </BaseBottomSheet>
);

export default React.memo(EventMenu);
