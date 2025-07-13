import * as yup from "yup";

const createCallSchema = yup.object({
  cult: yup
    .string()
    .required("Culto é um campo obrigatório.")
    .trim()
    .test(
      "no-multiple-spaces",
      "Não é permitido mais de um espaço entre as palavras",
      (value) => !/\s{2,}/.test(value!)
    )
    .matches(
      /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/,
      "Preencha apenas caracteters alfabéticos"
    ),
  hour: yup
    .string()
    .required("Horário é um campo obrigatório.")
    .test("is-valid-time", "Horário inválido", (value) => {
      if (!value) return false;

      const [hourStr, minuteStr] = value.split("h");
      const hour = Number(hourStr);
      const minutes = Number(minuteStr);

      const hourValid = hour >= 0 && hour <= 23;
      const minuteValid = minutes >= 0 && minutes <= 59;

      return hourValid && minuteValid;
    }),
  namePreacher: yup
    .string()
    .optional()
    .trim()
    .test(
      "no-multiple-spaces",
      "Não é permitido mais de um espaço entre as palavras",
      (value) => !/\s{2,}/.test(value!)
    )
    .test(
      "no-more-than-three-words",
      "Preencha no máximo 3 palavras",
      (value) => (value || "").split(/\s+/).length <= 3
    )
    .matches(/^(?!.*\..*\.)[A-Za-zÀ-ÖØ-öø-ÿ\s.]+$/, "Nome inválido"),
  local: yup.string().optional(),
  callType: yup.string().required("Tipo de chamada é obrigatório"),
  date: yup
    .string()
    .required("Data é obrigatória!")
    .matches(/^\d{2}\/\d{2}\/\d{4}$/, "Preencha a data corretamente")
    .test("is-valid-date", "Data inválida", (value) => {
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
    }),
});

export type CreateCallData = yup.InferType<typeof createCallSchema>;

export default createCallSchema;
