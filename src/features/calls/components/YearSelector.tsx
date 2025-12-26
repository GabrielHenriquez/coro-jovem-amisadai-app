import React from "react";
import { View as RNView } from "react-native";
import { Dropdown, Text } from "@components/index";
import { FieldError } from "react-hook-form";
import { CalendarDaysIcon } from "lucide-react-native";
import { reportStyles } from "../styles/ReportStyles";

interface YearSelectorProps {
  years: string[];
  control: any;
  errors: any;
}

const YearSelector: React.FC<YearSelectorProps> = ({
  years,
  control,
  errors,
}) => {
  return (
    <RNView style={reportStyles.periodContainer}>
      <RNView style={reportStyles.periodHeader}>
        <Text className="font-poppinsSemiBold text-black">
          Selecione o Ano
        </Text>
      </RNView>

      <Dropdown
        data={years}
        name="year"
        control={control}
        error={errors.year as FieldError}
        icon={
          <CalendarDaysIcon strokeWidth={2.5} size={23} color={"#FFFFFF"} />
        }
        placeholder="Selecione o ano"
      />
    </RNView>
  );
};

export default YearSelector;

