import { useCallback, useMemo, useState } from "react";

export const useMonthFormatting = () => {
  const [currentMonthFormatted, setCurrentMonthFormatted] = useState("");

  const monthYearFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat("pt-BR", {
        month: "long",
        year: "numeric",
      }),
    []
  );

  const formatMonthYear = useCallback(
    ({ month, year }: { month: number; year: number }): string => {
      const raw = monthYearFormatter.format(new Date(year, month - 1));
      const cleaned = raw.replace(" de ", " ");
      return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
    },
    [monthYearFormatter]
  );

  const currentMonth = useMemo(() => {
    return new Date()
      .toLocaleDateString("pt-BR", { month: "long", year: "numeric" })
      .replace(" de ", " ")
      .replace(/^./, (letra) => letra.toUpperCase());
  }, []);

  const handleMonthChange = useCallback(
    (month: { month: number; year: number }) => {
      setCurrentMonthFormatted(formatMonthYear(month));
    },
    [formatMonthYear]
  );

  return {
    formatMonthYear,
    currentMonth,
    currentMonthFormatted,
    handleMonthChange,
  };
};
