import { ISong } from "./Songs";

export interface IEventCard {
  id: string;
  title: string;
  type: string;
  cult: string;
  hour: string;
  date: string;
  [key: string]: any;
}

export interface IEvent {
  id?: string;
  type: "Escala" | "Saída";
  cult: string;
  hour: string;
  namePreacher: string;
  officePreacher?: string;
  scheduleBy: string;
  date: string;
  local: string;
  components: Array<{ name: string; id: string; gender: string; suit: string }>;
  musics: ISong[];
  missingComponents: Array<{ name: string; id: string; gender: string; suit: string }>;
  numberSearchDoc: number;
}

export interface IEventBirthDateCard {
  id: string;
  name: string;
  birthDate: string;
  [key: string]: any;
}
