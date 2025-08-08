export const formatDateToUS = (date: string) => {
  let parts = date.split("/");
  let utcDate = new Date(Date.UTC(parts[2], parts[1] - 1, parts[0]));
  let americanDate = `${utcDate.getUTCFullYear()}-${(utcDate.getUTCMonth() + 1)
    .toString()
    .padStart(2, "0")}-${utcDate.getUTCDate().toString().padStart(2, "0")}`;
  return americanDate;
};
