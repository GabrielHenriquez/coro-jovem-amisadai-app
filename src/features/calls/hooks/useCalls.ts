import { useCallback, useMemo, useRef, useState } from "react";
import { useEventsQueries } from "../infra/queryAdapters/useEventsQueries";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { IEvent } from "../domain/entities/Events";
import { useQueryClient } from "@tanstack/react-query";
import { useToastStore } from "../stores/useToastStore";

export const useCalls = () => {
  const formatoAmericano = new Date().toISOString().split("T")[0];
  const queryClient = useQueryClient();
  const [opennedCalendar, setOpennedCalendar] = useState(false);
  const { setMessage } = useToastStore();
  const [selectedDate, setSelectedDate] = useState<string | undefined>(
    formatoAmericano
  );
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const callPreviewModalRef = useRef<BottomSheetModal>(null);
  const [visibleModalDelete, setVisibleModalDelete] = useState(false);

  const {
    getDotsQuery,
    getEventsQuery,
    getBirthDatesQuery,
    getEventByIdMutation,
    deleteEventMutation,
  } = useEventsQueries();

  // Memoized calendar toggle to prevent unnecessary re-renders
  const toggleCalendar = useCallback(() => {
    setOpennedCalendar((prev) => !prev);
  }, []);

  // Memoized modal action handler
  const handleModalAction = useCallback(
    (ref: React.RefObject<any>, action: "present" | "close") => {
      if (!ref.current) return;
      if (action === "present") return ref.current.present();
      ref.current.close();
    },
    []
  );

  // Memoized event getter
  const handleGetEvent = useCallback(
    (eventId: string) => {
      getEventByIdMutation.mutate(eventId, {
        onSuccess: () => {
          handleModalAction(bottomSheetModalRef, "present");
        },
      });
    },
    [getEventByIdMutation, handleModalAction]
  );

  // Memoized validation function
  const validate = useCallback(() => {
    handleModalAction(bottomSheetModalRef, "close");
    setTimeout(() => handleModalAction(callPreviewModalRef, "present"), 500);
  }, [handleModalAction]);

  // Memoized dots data with proper dependency
  const dots = useMemo(() => {
    if (!getDotsQuery.data) return {};
    return Object.assign({}, ...getDotsQuery.data);
  }, [getDotsQuery.data]);

  // Memoized filtered events with proper dependency
  const events = useMemo(() => {
    if (!selectedDate || !getEventsQuery.data) return [];
    return getEventsQuery.data.filter((event) => event.date === selectedDate);
  }, [selectedDate, getEventsQuery.data]);

  // Memoized filtered birth dates with proper dependency
  const eventsBirthDate = useMemo(() => {
    if (!selectedDate || !getBirthDatesQuery.data) return [];
    return getBirthDatesQuery.data.filter((e) => e.birthDate === selectedDate);
  }, [selectedDate, getBirthDatesQuery.data]);

  // Memoized date change handler
  const getEventsByDateToCard = useCallback(
    (date: string) => {
      if (opennedCalendar) setOpennedCalendar(false);
      setSelectedDate(date);
    },
    [opennedCalendar]
  );

  // Memoized delete event handler
  const handleDeleteEvent = useCallback(
    (event: IEvent) => {
      deleteEventMutation.mutate(event, {
        onSuccess: async () => {
          setVisibleModalDelete(false);
          handleModalAction(bottomSheetModalRef, "close");
          await Promise.all([getDotsQuery.refetch(), getEventsQuery.refetch()]);
          setMessage("Chamada excluída com sucesso!");
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

  // Memoized loading state to prevent unnecessary re-renders
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

  // Memoized loading event state
  const loadingEvent = useMemo(
    () => getEventByIdMutation?.isPending,
    [getEventByIdMutation?.isPending]
  );

  // Memoized delete loading state
  const isLoadingDelete = useMemo(
    () => deleteEventMutation?.isPending,
    [deleteEventMutation?.isPending]
  );

  return {
    // Calendar state
    opennedCalendar,
    toggleCalendar,
    selectedDate,

    // Modal refs
    bottomSheetModalRef,
    callPreviewModalRef,

    // Event data
    events,
    eventsBirthDate,
    event: getEventByIdMutation?.data,
    dots,

    // Loading states
    loadingData,
    loadingEvent,
    isLoadingDelete,

    // Query objects for direct access
    getBirthDatesQuery,

    // Modal state
    visibleModalDelete,
    setVisibleModalDelete,

    // Event handlers
    handleModalAction,
    handleGetEvent,
    validate,
    getEventsByDateToCard,
    handleDeleteEvent,
  };
};
