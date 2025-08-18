import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Button, Text } from "@components/index";
import { colors } from "@styles/colors";
import { Pen, Trash2 } from "lucide-react-native";
import getHeight from "global/constants/height";
import * as RN from "react-native";

interface EventActionsProps {
  loadingEventPreview: boolean;
  generatePDF: () => void;
  handleEditCall: () => void;
  handleOpenModalDelete: () => void;
}

const EventActions: React.FC<EventActionsProps> = ({
  loadingEventPreview,
  generatePDF,
  handleEditCall,
  handleOpenModalDelete,
}) => (
  <RN.View className="w-full gap-3.5">
    <Button
      styleRest={{ height: getHeight * 0.05 }}
      activeLoading={loadingEventPreview}
      onPress={generatePDF}
    >
      <MaterialIcons name="picture-as-pdf" color={colors.white} size={22} />
      <Text size={14} className="font-poppinsSemiBold text-white">
        Visualizar chamada
      </Text>
    </Button>

    <Button
      bgColor="background"
      onPress={handleEditCall}
      styleRest={{
        height: getHeight * 0.05,
      }}
    >
      <Pen strokeWidth={2.5} color={colors.primary} size={18} />
      <Text size={14} className="font-poppinsSemiBold text-primary">
        Editar chamada
      </Text>
    </Button>

    <Button
      bgColor="white"
      styleRest={{
        borderWidth: 1.5,
        borderColor: colors.redDark,
        height: getHeight * 0.05,
      }}
      onPress={handleOpenModalDelete}
    >
      <Trash2 strokeWidth={2.5} color={colors.redDark} size={18} />
      <Text size={14} className="font-poppinsSemiBold text-redDark">
        Excluir chamada
      </Text>
    </Button>
  </RN.View>
);

export default React.memo(EventActions);
