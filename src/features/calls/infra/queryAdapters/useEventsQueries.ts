import { useQuery, useMutation } from "@tanstack/react-query";
import { FirebaseEventsService } from "./services/FirebaseEventsService";
import { IEvent } from "@features/calls/domain/entities/Events";
import { IEventCard } from "./../../domain/entities/Events";
import { colors } from "@styles/colors";

const repository = new FirebaseEventsService();

export const useEventsQueries = () => {
  const getDotsQuery = useQuery({
    queryKey: ["dots"],
    queryFn: () => repository.getDots(),
  });

  const getEventsQuery = useQuery({
    queryKey: ["events"],
    queryFn: () => repository.getEvents(),
  });

  const getBirthDatesQuery = useQuery({
    queryKey: ["birthDates"],
    queryFn: () => repository.getEventsBirthDate(),
  });

  const getEventByIdMutation = useMutation({
    mutationFn: (eventId: string) => repository.getEvent(eventId),
  });

  const createEventMutation = useMutation({
    mutationFn: async ({
      eventId,
      oldKey,
      dataFormEvent,
      dataFormEventCard,
    }: {
      eventId: string;
      oldKey?: string;
      dataFormEvent: IEvent;
      dataFormEventCard: IEventCard;
    }) => {
      const key = `${dataFormEvent?.type}-${dataFormEvent?.date}-${dataFormEvent?.numberSearchDoc}`;
      const color =
        dataFormEvent?.type === "Saída" ? colors.redEvent : colors.blueEvent;

      await Promise.all([
        repository.createEvent({ eventId, data: dataFormEvent }),
        repository.createEventCard({ eventId, data: dataFormEventCard }),
        repository.createDotToEventInDB({
          date: dataFormEvent?.date,
          key,
          oldKey,
          color,
        }),
      ]);
    },
  });

  const deleteEventMutation = useMutation({
    mutationFn: async (event: IEvent) => {
      const key = `${event?.type}-${event?.date}-${event?.numberSearchDoc}`;

      await Promise.all([
        repository.deleteEvent(`${event?.date}-${event?.numberSearchDoc}`),
        repository.deleteDotInDB({
          date: event?.date,
          key,
        }),
      ]);
    },
  });

  return {
    getDotsQuery,
    getEventsQuery,
    getBirthDatesQuery,
    getEventByIdMutation,
    createEventMutation,
    deleteEventMutation,
  };
};
