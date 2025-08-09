import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useEventsQueries } from "../infra/queryAdapters/useEventsQueries";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { IEvent } from "../domain/entities/Events";
import { useQueryClient } from "@tanstack/react-query";
import { DateData } from "react-native-calendars";

export const useCalls = () => {
  const formatoAmericano = new Date().toISOString().split("T")[0];
  const queryClient = useQueryClient();
  const [opennedCalendar, setOpennedCalendar] = useState(false);
  const [showToastDelete, setShowToastDelete] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | undefined>(
    formatoAmericano
  );
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const callPreviewModalRef = useRef<BottomSheetModal>(null);
  const {
    getDotsQuery,
    getEventsQuery,
    getBirthDatesQuery,
    getEventByIdMutation,
    deleteEventMutation,
  } = useEventsQueries();

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

  const handleGetEvent = (eventId: string) => {
    getEventByIdMutation.mutate(eventId, {
      onSuccess: () => {
        handleModalAction(bottomSheetModalRef, "present");
      },
    });
  };

  const validate = useCallback(() => {
    handleModalAction(bottomSheetModalRef, "close");
    setTimeout(() => handleModalAction(callPreviewModalRef, "present"), 500);
  }, []);

  const dots = useMemo(() => {
    if (!getDotsQuery.data) return {};
    return Object.assign({}, ...getDotsQuery.data);
  }, [getDotsQuery.data]);

  const events = useMemo(() => {
    if (!selectedDate || !getEventsQuery.data) return [];
    return getEventsQuery.data.filter((event) => event.date === selectedDate);
  }, [selectedDate, getEventsQuery.data]);

  const eventsBirthDate = useMemo(() => {
    if (!selectedDate || !getBirthDatesQuery.data) return [];
    return getBirthDatesQuery.data.filter((e) => e.birthDate === selectedDate);
  }, [selectedDate, getBirthDatesQuery.data]);

  const getEventsByDateToCard = (date: string) => {
    if (opennedCalendar) setOpennedCalendar(false);
    setSelectedDate(date);
  };

  const handleDeleteEvent = (event: IEvent) => {
    deleteEventMutation.mutate(event, {
      onSuccess: async () => {
        await queryClient.refetchQueries({
          queryKey: ["events"],
        });
        await queryClient.refetchQueries({
          queryKey: ["dots"],
        });

        handleModalAction(bottomSheetModalRef, "close");
        setShowToastDelete(true);
      },
    });
  };

  return {
    toggleCalendar,
    bottomSheetModalRef,
    callPreviewModalRef,
    loadingEvent: getEventByIdMutation?.isPending,
    event: getEventByIdMutation?.data,
    selectedDate,
    validate,
    opennedCalendar,
    setOpennedCalendar,
    handleModalAction,
    handleGetEvent,
    setSelectedDate,
    loadingData:
      getDotsQuery.isLoading ||
      getEventsQuery.isLoading ||
      getBirthDatesQuery.isLoading,
    getEventsByDateToCard,
    isLoadingDelete: deleteEventMutation?.isPending,
    handleDeleteEvent,
    dots,
    events,
    eventsBirthDate,
    showToastDelete,
    setShowToastDelete,
  };
};
