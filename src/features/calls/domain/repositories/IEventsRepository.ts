import {
  IEvent,
  IEventBirthDateCard,
  IEventCard,
  IBirthdayEvent,
} from "../entities/Events";

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

  getBirthdayEventByMemberId(
    memberId: string,
    year: number
  ): Promise<IBirthdayEvent | null>;
  createOrUpdateBirthdayEvent(memberData: {
    id: string;
    name: string;
    birthDate: string;
    gender: string;
    suit: string;
    profileImage: string;
  }): Promise<void>;
  syncBirthdayEventsForNewYear(): Promise<void>;
  populateBirthdayEventsFromMembers(): Promise<void>;
}
