export const formatDateToBR = (date: string) => {
  const newDate = new Date(date);
  const formatted = newDate.toLocaleDateString("pt-BR");
  return formatted;
};
