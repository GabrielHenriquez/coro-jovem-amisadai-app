export const formatDateToUS = (date: string) => {
  if (!date) return "";
  const [dia, mes, ano] = date?.split("/");
  const formatted = `${ano}-${mes}-${dia}`;
  return formatted;
};
