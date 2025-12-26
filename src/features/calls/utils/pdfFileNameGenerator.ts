export const generateReportPdfFileName = (
  reportType: "faltas" | "presenças",
  month: string,
  year: string
): string => {
  const cleanMonth = month
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "_");

  const type = reportType === "faltas" ? "Faltas" : "Presencas";

  return `Relatorio_${type}_${cleanMonth}_${year}.pdf`;
};

export const generateCallPdfFileName = (event: {
  date: string;
  type?: string;
  cult?: string;
}): string => {
  let formattedDate = "";
  if (event.date) {
    const dateParts = event.date.split("-");
    if (dateParts.length === 3) {
      const [year, month, day] = dateParts;
      formattedDate = `${day}-${month}-${year}`;
    } else {
      formattedDate = event.date.replace(/\//g, "-");
    }
  }

  const cleanCult = event.cult
    ? event.cult
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9]/g, "_")
        .substring(0, 20)
    : "";

  const cultPart = cleanCult ? `_${cleanCult}` : "";
  const typePart = event.type ? `_${event.type}` : "";

  return `Chamada_CJA${typePart}${cultPart}_${formattedDate}.pdf`;
};

export const sanitizeFileName = (fileName: string): string => {
  return fileName
    .replace(/[<>:"/\\|?*]/g, "_")
    .replace(/\s+/g, "_")
    .replace(/_{2,}/g, "_")
    .trim();
};
