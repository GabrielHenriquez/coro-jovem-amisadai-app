import { IDropdownValues } from "@components/Dropdown";
import { yupResolver } from "@hookform/resolvers/yup";
import { Resolver, useForm } from "react-hook-form";
import * as yup from "yup";

const useFormReport = () => {
  const schema = yup.object().shape({
    month: yup.string().required("Mês é obrigatório"),
  });

  const resolver = yupResolver(schema) as Resolver<IDropdownValues>;

  const getCurrentMonth = () => {
    const months = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];
    const currentMonthIndex = new Date().getMonth();
    return months[currentMonthIndex];
  };

  const form = useForm<IDropdownValues>({
    defaultValues: {
      month: getCurrentMonth(),
    },
    resolver,
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  return { control, handleSubmit, errors };
};

export default useFormReport;
