export const formatDateToBR = (date: string) => {
  if (!date) return "";
  const [ano, mes, dia] = date?.split("-");
  const formatted = `${dia}/${mes}/${ano}`;
  return formatted;
};
