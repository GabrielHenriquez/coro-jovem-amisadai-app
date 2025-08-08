import { IEventsRepository } from "../../domain/repositories/IEventsRepository";
import { IEvent, IEventBirthDateCard } from "../../domain/entities/Events";

interface Response {
  dots: Record<string, { dots: { key: string; color: string }[] }>;
  events: IEvent[];
  eventsBirthDate: IEventBirthDateCard[];
}

export class GetEventsByDateUseCase {
  constructor(private repository: IEventsRepository) {}

  async execute(date: string): Promise<Response> {
    const [dots, events, eventsBirthDates] = await Promise.all([
      this.repository.getDots(),
      this.repository.getEvents(),
      this.repository.getEventsBirthDate(),
    ]);

    const mergedDots = dots ? Object.assign({}, ...dots) : {};

    const filteredEvents = events.filter((e) => e.date === date);
    const filteredBirths = eventsBirthDates.filter((b) => b.birthDate === date);

    return {
      dots: mergedDots,
      events: filteredEvents,
      eventsBirthDate: filteredBirths,
    };
  }
}
