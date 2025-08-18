import { useCallback, useMemo, useRef, useState, useTransition } from "react";
import { useEventsQueries } from "./useEventsQueries";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { IEvent } from "../domain/entities/Events";
import { useToastStore } from "../stores/useToastStore";
import { getTodayLocalDate } from "@utils/date";
import { colors } from "@styles/colors";
import { Log } from "@services/Logger";

export const useCalls = (currentMonth?: string) => {
  const todayLocalDate = getTodayLocalDate();
  const [opennedCalendar, setOpennedCalendar] = useState(false);
  const { setMessage } = useToastStore();
  const [selectedDate, setSelectedDate] = useState<string | undefined>(
    todayLocalDate
  );
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const callPreviewModalRef = useRef<BottomSheetModal>(null);
  const [visibleModalDelete, setVisibleModalDelete] = useState(false);

  const [isPending, startTransition] = useTransition();

  const {
    getDotsQuery,
    getEventsQuery,
    getBirthDatesQuery,
    getEventByIdMutation,
    deleteEventMutation,
  } = useEventsQueries();

  const colorMap = useMemo(
    () => ({
      Saída: colors.redEvent,
      Escala: colors.blueEvent,
      Local: colors.blueEvent,
      aniversariante: colors.birthDayEvent,
    }),
    []
  );

  const toggleCalendar = useCallback(() => {
    setOpennedCalendar((prev) => !prev);
  }, []);

  const handleModalAction = useCallback(
    (ref: React.RefObject<any>, action: "present" | "close") => {
      if (!ref.current) return;
      if (action === "present") return ref.current.present();
      ref.current.close();
    },
    []
  );

  const handleGetEvent = useCallback(
    (eventId: string) => {
      getEventByIdMutation.mutate(eventId, {
        onSuccess: () => {
          handleModalAction(bottomSheetRef, "present");
        },
      });
    },
    [getEventByIdMutation, handleModalAction]
  );

  const validate = useCallback(() => {
    handleModalAction(bottomSheetRef, "close");
    setTimeout(() => handleModalAction(callPreviewModalRef, "present"), 500);
  }, [handleModalAction]);

  const getDotColor = useCallback(
    (key: string): string => {
      const colorMapObj = new Map(Object.entries(colorMap));

      for (const [pattern, color] of colorMapObj) {
        if (key.includes(pattern)) return color;
      }
      return "";
    },
    [colorMap]
  );

  const dots = useMemo(() => {
    if (!getDotsQuery.data) return {};

    const dotsData = Object.assign({}, ...getDotsQuery.data);
    const dotsWithColors: {
      [date: string]: { dots: { key: string; color: string }[] };
    } = {};

    Object.keys(dotsData).forEach((date) => {
      const dateData = dotsData[date];
      if (dateData?.dots) {
        dotsWithColors[date] = {
          ...dateData,
          dots: dateData.dots.map((dot: { key: string }) => ({
            ...dot,
            color: getDotColor(dot.key),
          })),
        };
      }
    });

    return dotsWithColors;
  }, [getDotsQuery.data, getDotColor]);

  const events = useMemo(() => {
    if (!selectedDate || !getEventsQuery.data) return [];

    if (getEventsQuery.data.length > 100) {
      const eventsSet = new Set(getEventsQuery.data.map((e) => e.date));
      if (!eventsSet.has(selectedDate)) return [];
    }

    return getEventsQuery.data.filter((event) => event.date === selectedDate);
  }, [selectedDate, getEventsQuery.data]);

  const eventsByMonth = useMemo(() => {
    if (!getEventsQuery.data || !currentMonth) return [];

    const monthYear = currentMonth.split(" ");
    if (monthYear.length !== 2) {
      return [];
    }

    const month = monthYear[0];
    const year = monthYear[1];

    const monthMap: { [key: string]: string } = {
      Janeiro: "01",
      Fevereiro: "02",
      Março: "03",
      Abril: "04",
      Maio: "05",
      Junho: "06",
      Julho: "07",
      Agosto: "08",
      Setembro: "09",
      Outubro: "10",
      Novembro: "11",
      Dezembro: "12",
    };

    const monthNumber = monthMap[month];
    if (!monthNumber) return [];

    const eventIds = getEventsQuery.data
      .filter((event) => {
        if (!event || !event.date) return false;

        try {
          const [eventYear, eventMonth] = event.date.split("-");
          const matches = eventYear === year && eventMonth === monthNumber;

          return matches;
        } catch (error) {
          return false;
        }
      })
      .map((event) => event?.id)
      .filter(Boolean) as string[];

    return eventIds;
  }, [getEventsQuery.data, currentMonth]);

  const eventsBirthDate = useMemo(() => {
    if (!selectedDate || !getBirthDatesQuery.data) return [];

    if (getBirthDatesQuery.data.length > 100) {
      const birthDatesSet = new Set(
        getBirthDatesQuery.data.map((e) => e.birthDate)
      );
      if (!birthDatesSet.has(selectedDate)) return [];
    }

    return getBirthDatesQuery.data.filter((e) => e.birthDate === selectedDate);
  }, [selectedDate, getBirthDatesQuery.data]);

  const getEventsByDateToCard = useCallback(
    (date: string) => {
      if (opennedCalendar) setOpennedCalendar(false);
      setSelectedDate(date);
    },
    [opennedCalendar]
  );

  const handleDeleteEvent = useCallback(
    (event: IEvent) => {
      deleteEventMutation.mutate(event, {
        onSuccess: async () => {
          setVisibleModalDelete(false);
          handleModalAction(bottomSheetRef, "close");

          startTransition(async () => {
            await Promise.all([
              getDotsQuery.refetch(),
              getEventsQuery.refetch(),
            ]);
            setMessage("Chamada excluída com sucesso!");
          });
        },
        onError: (error) => {
          Log.error(`Erro ao excluir chamada! ${error}`);
        },
      });
    },
    [
      deleteEventMutation,
      handleModalAction,
      getDotsQuery,
      getEventsQuery,
      setMessage,
    ]
  );

  const loadingData = useMemo(
    () =>
      getDotsQuery.isLoading ||
      getEventsQuery.isLoading ||
      getBirthDatesQuery.isLoading,
    [
      getDotsQuery.isLoading,
      getEventsQuery.isLoading,
      getBirthDatesQuery.isLoading,
    ]
  );

  const loadingEvent = useMemo(
    () => getEventByIdMutation?.isPending,
    [getEventByIdMutation?.isPending]
  );

  const isLoadingDelete = useMemo(
    () => deleteEventMutation?.isPending,
    [deleteEventMutation?.isPending]
  );

  return {
    opennedCalendar,
    toggleCalendar,
    selectedDate,

    bottomSheetRef,
    callPreviewModalRef,

    events,
    eventsByMonth,
    eventsBirthDate,
    event: getEventByIdMutation?.data,
    dots,

    loadingData,
    loadingEvent,
    isLoadingDelete,
    isPending,

    getBirthDatesQuery,

    visibleModalDelete,
    setVisibleModalDelete,

    handleModalAction,
    handleGetEvent,
    validate,
    getEventsByDateToCard,
    handleDeleteEvent,
  };
};
