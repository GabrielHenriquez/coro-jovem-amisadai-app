import { IEvent, IEventBirthDateCard, IEventCard } from "../entities/Events";

export interface IEventsRepository {
  getDots(): Promise<any[]>;
  getEvent(eventId: string): Promise<IEvent | {}>;
  getEvents(): Promise<IEventCard[]>;
  getEventsBirthDate(): Promise<IEventBirthDateCard[]>;
  createEvent({
    eventId,
    data,
  }: {
    eventId: string;
    data: IEvent;
  }): Promise<void>;
  createEventCard({
    eventId,
    data,
  }: {
    eventId: string;
    data: IEventCard;
  }): Promise<void>;
}
