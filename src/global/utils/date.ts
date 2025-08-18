export const formatDateToUS = (date: string) => {
  if (!date) return "";
  const [dia, mes, ano] = date?.split("/");
  const formatted = `${ano}-${mes}-${dia}`;
  return formatted;
};

export const getTodayLocalDate = (
  timeZone: string = "America/Sao_Paulo"
): string => {
  const hoje = new Date();

  const partes = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(hoje);

  const ano = partes.find((p) => p.type === "year")?.value;
  const mes = partes.find((p) => p.type === "month")?.value;
  const dia = partes.find((p) => p.type === "day")?.value;

  return `${ano}-${mes}-${dia}`;
};

export const formatDateToBR = (date: string) => {
  if (!date || typeof date !== "string") return "Data inválida";

  try {
    const [ano, mes, dia] = date.split("-");
    if (!ano || !mes || !dia) return "Data inválida";

    const formatted = `${dia}/${mes}/${ano}`;
    return formatted;
  } catch (error) {
    return "Data inválida";
  }
};
