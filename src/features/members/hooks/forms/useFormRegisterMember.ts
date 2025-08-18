import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export const formSchema = yup.object({
  name: yup
    .string()
    .required("Nome é um campo obrigatório")
    .trim()
    .test(
      "no-multiple-spaces",
      "Não é permitido mais de um espaço entre as palavras",
      (value) => !/\s{2,}/.test(value || "")
    )
    .test(
      "no-more-than-three-words",
      "Preencha no máximo 3 palavras",
      (value) => (value || "").split(/\s+/).length <= 3
    )
    .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, "Nome inválido"),
  phone: yup
    .string()
    .required("Telefone é um campo obrigatório")
    .min(15, "Preencha todos os dígitos"),
  memberCard: yup
    .string()
    .required("Nº Cartão de membro é um campo obrigatório")
    .min(9, "Preencha todos os dígitos"),
  zipCode: yup
    .string()
    .required("CEP é um campo obrigatório.")
    .min(9, "Preencha o CEP completo."),
  birthDate: yup
    .string()
    .required("Data de nascimento é obrigatória!")
    .matches(/^\d{2}\/\d{2}\/\d{4}$/, "Preencha a data corretamente")
    .test("is-valid-date", "Data de nascimento inválida.", (value) => {
      if (!value) return false;

      const [day, month, year] = value.split("/").map(Number);
      const currentYear = new Date().getFullYear();
      if (year < 1900 || year > currentYear) return false;

      const date = new Date(year, month - 1, day);
      return (
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day
      );
    })
    .test(
      "is-before-today",
      "A data deve ser anterior à data de hoje.",
      (value) => {
        if (!value) return false;
        const [day, month, year] = value.split("/").map(Number);
        const inputDate = new Date(year, month - 1, day);
        return inputDate < new Date();
      }
    ),
  street: yup.string().required("Rua é um campo obrigatório"),
  number: yup.string().required("Nº é um campo obrigatório"),
  gender: yup.string().required("Gênero é uma seleção obrigatória"),
  suit: yup.string().required("Gênero é uma seleção obrigatória"),
  baptized: yup.string().required("Batismo é uma seleção obrigatória"),
  neighborhood: yup.string().required("Bairro é um campo obrigatório"),
  uf: yup.string().optional(),
  city: yup.string().optional(),
  complement: yup.string().optional(),
}).required();

export type FormDataRegisterMember = yup.InferType<typeof formSchema>;

const useFormRegisterMember = () => {
  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(formSchema),
  });

  return {
    control,
    watch,
    handleSubmit,
    setValue,
    reset,
    errors,
  };
};

export default useFormRegisterMember;
