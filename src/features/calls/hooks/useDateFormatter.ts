import { useCallback, useMemo } from "react";

export const useDateFormatter = (selectedDate: string | null | undefined) => {
  const formatDateDisplay = useCallback((dateString: string | null): string => {
    if (!dateString) {
      return new Date()
        .toLocaleDateString("pt-BR", {
          weekday: "long",
          day: "numeric",
          month: "long",
        })
        .replace("-feira", "");
    }

    const dateParts = dateString.split("-");
    if (dateParts.length !== 3) {
      return new Date()
        .toLocaleDateString("pt-BR", {
          weekday: "long",
          day: "numeric",
          month: "long",
        })
        .replace("-feira", "");
    }

    const [ano, mes, dia] = dateParts.map(Number);
    const data = new Date(ano, mes - 1, dia);

    const formatador = new Intl.DateTimeFormat("pt-BR", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });

    let resultado = formatador.format(data);
    resultado = resultado.charAt(0).toUpperCase() + resultado.slice(1);
    resultado = resultado.replace("-feira", "");

    return resultado;
  }, []);

  const currentDateDisplay = useMemo(
    () => formatDateDisplay(selectedDate || null),
    [selectedDate, formatDateDisplay]
  );

  return {
    formatDateDisplay,
    currentDateDisplay,
  };
};
