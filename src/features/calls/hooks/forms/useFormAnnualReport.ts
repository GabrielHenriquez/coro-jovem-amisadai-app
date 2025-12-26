import { IDropdownValues } from "@components/Dropdown";
import { yupResolver } from "@hookform/resolvers/yup";
import { Resolver, useForm } from "react-hook-form";
import * as yup from "yup";

const useFormAnnualReport = () => {
  const schema = yup.object().shape({
    year: yup.string().required("Ano é obrigatório"),
  });

  const resolver = yupResolver(schema) as Resolver<IDropdownValues>;

  const getCurrentYear = () => {
    const current = new Date().getFullYear();
    return current >= 2025 ? current.toString() : "2025";
  };

  const form = useForm<IDropdownValues>({
    defaultValues: {
      year: getCurrentYear(),
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

export default useFormAnnualReport;
