import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { IEventsRepository } from "@features/calls/domain/repositories/IEventsRepository";
import {
  IEvent,
  IEventBirthDateCard,
  IEventCard,
} from "../../../domain/entities/Events";
import { db } from "global/configs/firebase";
import { DB_COLLECTIONS } from "@utils/DB_collections";

export class FirebaseEventsService implements IEventsRepository {
  async getDots() {
    const ref = collection(db, DB_COLLECTIONS.dots);
    const snapshot = await getDocs(ref);
    return snapshot.docs.map((doc) => doc.data());
  }

  async getEvent(eventId: string): Promise<IEvent> {
    const docRef = doc(db, DB_COLLECTIONS.events, eventId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as IEvent;
    } else {
      throw Error(`Evento ${eventId} não encontrado`);
    }
  }

  async getEvents(): Promise<IEventCard[]> {
    const ref = collection(db, DB_COLLECTIONS.eventsCard);
    const snapshot = await getDocs(ref);
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        date: data.date,
        ...data,
      } as IEventCard;
    });
  }

  async getEventsBirthDate(): Promise<IEventBirthDateCard[]> {
    const ref = collection(db, DB_COLLECTIONS.eventsBirthDateCard);
    const snapshot = await getDocs(ref);
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        birthDate: data.birthDate,
        ...data,
      } as IEventBirthDateCard;
    });
  }

  async createEvent({
    data,
    eventId,
  }: {
    eventId: string;
    data: IEvent;
  }): Promise<void> {
    await setDoc(doc(db, DB_COLLECTIONS.events, eventId), data);
  }

  async createEventCard({
    eventId,
    data,
  }: {
    eventId: string;
    data: IEventCard;
  }): Promise<void> {
    await setDoc(doc(db, DB_COLLECTIONS.eventsCard, eventId), data);
  }

  async createDotToEventInDB({
    key,
    oldKey,
    color,
    date,
  }: {
    key: string;
    oldKey?: string;
    color: string;
    date: string;
  }): Promise<void> {
    const dotRef = doc(db, DB_COLLECTIONS.dots, date);
    const querySnapshot = await getDoc(dotRef);
    const newDot = { key, color };

    if (querySnapshot.exists()) {
      const dataResponse = querySnapshot.data();
      const currentDots = dataResponse[date]?.dots || [];

      const filteredDots = currentDots.filter(
        (dot: { key: string }) =>
          dot.key !== key && (oldKey ? dot.key !== oldKey : true)
      );

      const updatedDots = [...filteredDots, newDot];
      dataResponse[date] = { ...dataResponse[date], dots: updatedDots };

      await setDoc(dotRef, dataResponse);
    } else {
      const schemaDot = {
        [date]: { dots: [newDot] },
      };
      await setDoc(dotRef, schemaDot);
    }
  }

  async deleteDotInDB({
    key,
    date,
  }: {
    key: string;
    date: string;
  }): Promise<void> {
    const dotRef = doc(db, DB_COLLECTIONS.dots, date);
    const querySnapshot = await getDoc(dotRef);
    const keyDotToRemove = {
      key,
    };
    if (querySnapshot.exists()) {
      const dataResponse = querySnapshot.data();
      if (dataResponse[date]?.dots.length > 1) {
        const filterToRemoveDot = dataResponse[date]?.dots
          .map((item: any) => {
            return item;
          })
          .filter((dot: { key: string }) => {
            return dot?.key !== keyDotToRemove.key;
          });

        const newDots = filterToRemoveDot;
        dataResponse[date].dots = newDots;
        await setDoc(doc(db, DB_COLLECTIONS.dots, date), dataResponse);
      } else if (dataResponse[date]?.dots.length === 1) {
        await deleteDoc(doc(db, DB_COLLECTIONS.dots, date));
      }
    }
  }

  async deleteEvent(eventId: string): Promise<void> {
    const docRef = doc(db, DB_COLLECTIONS.events, eventId);
    const docCardRef = doc(db, DB_COLLECTIONS.eventsCard, eventId);
    await Promise.all([deleteDoc(docRef), deleteDoc(docCardRef)]);
  }
}
