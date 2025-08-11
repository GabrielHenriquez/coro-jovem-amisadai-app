import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const useFormSong = () => {
  const formSchema = yup.object({
    song: yup
      .string()
      .required("Música é um campo obrigatório.")
      .trim()
      .transform((value) => value.toUpperCase())
      .test(
        "no-multiple-spaces",
        "Não é permitido mais de um espaço entre as palavras",
        (value) => !/\s{2,}/.test(value!)
      )
      .matches(
        /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/,
        "Preencha apenas caracteters alfabéticos"
      ),
  });

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<{ song: string }>({
    resolver: yupResolver(formSchema),
  });

  const resetForm = () => {
    reset();
  };

  const handleSetValue = (value: string) => {
    setValue("song", value);
  };

  return {
    control,
    handleSubmit,
    errors,
    resetForm,
    handleSetValue,
  };
};

export default useFormSong;
