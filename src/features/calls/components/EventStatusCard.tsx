import React from "react";
import { View as RNView } from "react-native";
import { Text } from "@components/index";
import { reportStyles } from "../styles/ReportStyles";

interface EventStatusCardProps {
  eventsByMonth: any[] | undefined;
}

const EventStatusCard: React.FC<EventStatusCardProps> = ({ eventsByMonth }) => {
  if (eventsByMonth === undefined) {
    return (
      <RNView style={[reportStyles.statusCard, reportStyles.statusCardLoading]}>
        <RNView style={reportStyles.statusContent}>
          <RNView
            style={[reportStyles.statusDot, reportStyles.statusDotLoading]}
          />
          <Text className="font-poppinsRegular text-gray-500">
            Buscando chamadas do período...
          </Text>
        </RNView>
      </RNView>
    );
  }

  if (eventsByMonth.length > 0) {
    return (
      <RNView style={[reportStyles.statusCard, reportStyles.statusCardSuccess]}>
        <RNView style={reportStyles.statusContent}>
          <RNView
            style={[reportStyles.statusDot, reportStyles.statusDotSuccess]}
          />
          <Text size={15} className="font-poppinsMedium text-greenDark">
            {eventsByMonth.length} chamadas encontradas para este mês
          </Text>
        </RNView>
      </RNView>
    );
  }

  return (
    <RNView style={[reportStyles.statusCard, reportStyles.statusCardWarning]}>
      <RNView style={reportStyles.statusContent}>
        <RNView
          style={[reportStyles.statusDot, reportStyles.statusDotWarning]}
        />
        <Text size={14} className="font-poppinsMedium text-gray-500">
          Nenhuma chamada encontrada para este mês
        </Text>
      </RNView>
    </RNView>
  );
};

export default EventStatusCard;
