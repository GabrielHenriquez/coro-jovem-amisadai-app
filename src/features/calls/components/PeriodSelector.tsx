import React from "react";
import { View as RNView } from "react-native";
import { Dropdown, Text } from "@components/index";
import { FieldError } from "react-hook-form";
import { CalendarDaysIcon } from "lucide-react-native";
import { reportStyles } from "../styles/ReportStyles";

interface PeriodSelectorProps {
  months: Array<{ label: string; value: string }>;
  currentYear: string;
  control: any;
  errors: any;
}

const PeriodSelector: React.FC<PeriodSelectorProps> = ({
  months,
  currentYear,
  control,
  errors,
}) => {
  return (
    <RNView style={reportStyles.periodContainer}>
      <RNView style={reportStyles.periodHeader}>
        <Text className="font-poppinsSemiBold text-black">
          Selecione o Período
        </Text>
        <RNView style={reportStyles.yearBadge}>
          <Text size={14} className="font-poppinsSemiBold text-white">
            {currentYear}
          </Text>
        </RNView>
      </RNView>

      <Dropdown
        data={months.map((month) => month.label)}
        name="month"
        control={control}
        error={errors.month as FieldError}
        icon={
          <CalendarDaysIcon strokeWidth={2.5} size={23} color={"#FFFFFF"} />
        }
        placeholder="Selecione o mês"
      />
    </RNView>
  );
};

export default PeriodSelector;
