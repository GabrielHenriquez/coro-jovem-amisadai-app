import * as DB from "firebase/firestore";
import { IEventsRepository } from "@features/calls/domain/repositories/IEventsRepository";
import {
  IEvent,
  IEventBirthDateCard,
  IEventCard,
  IBirthdayEvent,
} from "../entities/Events";
import { db } from "global/configs/firebase";
import { Log } from "global/services/Logger";
import { DB_COLLECTIONS } from "global/constants/DB_COLLECTIONS";

export class FirebaseEventsService implements IEventsRepository {
  async getDots() {
    const ref = DB.collection(db, DB_COLLECTIONS.dots);
    const snapshot = await DB.getDocs(ref);
    const data = snapshot.docs.map((doc) => doc.data());
    return data;
  }

  async getEvent(eventId: string): Promise<IEvent> {
    const docRef = DB.doc(db, DB_COLLECTIONS.events, eventId);
    const docSnap = await DB.getDoc(docRef);
    if (docSnap.exists()) {
      const event = {
        id: docSnap.id,
        ...docSnap.data(),
      } as IEvent;
      return event;
    } else {
      throw Error(`Evento ${eventId} não encontrado`);
    }
  }

  async getEvents(): Promise<IEventCard[]> {
    const ref = DB.collection(db, DB_COLLECTIONS.eventsCard);
    const snapshot = await DB.getDocs(ref);
    const data = snapshot.docs.map((doc) => {
      const docData = doc.data();
      return {
        id: doc.id,
        title: docData.title,
        date: docData.date,
        ...docData,
      } as IEventCard;
    });

    return data;
  }

  async getEventsBirthDate(): Promise<IEventBirthDateCard[]> {
    const ref = DB.collection(db, DB_COLLECTIONS.eventsBirthDateCard);
    const snapshot = await DB.getDocs(ref);
    const data = snapshot.docs.map((doc) => {
      const docData = doc.data();
      return {
        id: doc.id,
        name: docData.name,
        birthDate: docData.birthDate,
        ...docData,
      } as IEventBirthDateCard;
    });

    return data;
  }

  async createEvent({
    data,
    eventId,
  }: {
    eventId: string;
    data: IEvent;
  }): Promise<void> {
    await DB.setDoc(DB.doc(db, DB_COLLECTIONS.events, eventId), data);
  }

  async createEventCard({
    eventId,
    data,
  }: {
    eventId: string;
    data: IEventCard;
  }): Promise<void> {
    await DB.setDoc(DB.doc(db, DB_COLLECTIONS.eventsCard, eventId), data);
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
    const dotRef = DB.doc(db, DB_COLLECTIONS.dots, date);
    const querySnapshot = await DB.getDoc(dotRef);
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

      await DB.setDoc(dotRef, dataResponse);
    } else {
      const schemaDot = {
        [date]: { dots: [newDot] },
      };
      await DB.setDoc(dotRef, schemaDot);
    }
  }

  async deleteDotInDB({
    key,
    date,
  }: {
    key: string;
    date: string;
  }): Promise<void> {
    const dotRef = DB.doc(db, DB_COLLECTIONS.dots, date);
    const querySnapshot = await DB.getDoc(dotRef);
    const keyDotToRemove = { key };

    if (querySnapshot.exists()) {
      const dataResponse = querySnapshot.data();
      if (dataResponse[date]?.dots.length > 1) {
        const filterToRemoveDot = dataResponse[date]?.dots
          .map((item: any) => item)
          .filter((dot: { key: string }) => dot?.key !== keyDotToRemove.key);

        const newDots = filterToRemoveDot;
        dataResponse[date].dots = newDots;
        await DB.setDoc(DB.doc(db, DB_COLLECTIONS.dots, date), dataResponse);
      } else if (dataResponse[date]?.dots.length === 1) {
        await DB.deleteDoc(DB.doc(db, DB_COLLECTIONS.dots, date));
      }
    }
  }

  async deleteEvent(eventId: string): Promise<void> {
    const docRef = DB.doc(db, DB_COLLECTIONS.events, eventId);
    const docCardRef = DB.doc(db, DB_COLLECTIONS.eventsCard, eventId);
    await Promise.all([DB.deleteDoc(docRef), DB.deleteDoc(docCardRef)]);
  }

  async getBirthdayEventByMemberId(
    memberId: string,
    year: number
  ): Promise<IBirthdayEvent | null> {
    try {
      const ref = DB.collection(db, DB_COLLECTIONS.eventsBirthDateCard);
      const q = DB.query(
        ref,
        DB.where("memberId", "==", memberId),
        DB.where("year", "==", year),
        DB.limit(1)
      );
      const snapshot = await DB.getDocs(q);

      if (snapshot.empty) return null;

      const doc = snapshot.docs[0];
      return {
        id: doc.id,
        ...doc.data(),
      } as IBirthdayEvent;
    } catch (error) {
      Log.error("Erro ao buscar evento de aniversário:", error);
      return null;
    }
  }

  async createOrUpdateBirthdayEvent(memberData: {
    id: string;
    name: string;
    birthDate: string;
    gender: string;
    profileImage: string;
  }): Promise<void> {
    try {
      const currentYear = new Date().getFullYear();
      const birthDateParts = memberData.birthDate.split("/");
      const month = birthDateParts[1];
      const day = birthDateParts[0];

      const existingEvent = await this.getBirthdayEventByMemberId(
        memberData.id,
        currentYear
      );

      if (existingEvent) {
        const existingBirthDate = existingEvent.birthDate;
        const newBirthDate = `${currentYear}-${month}-${day}`;

        if (existingBirthDate === newBirthDate) return;

        const updatedEvent: IBirthdayEvent = {
          ...existingEvent,
          birthDate: newBirthDate,
          updatedAt: Date.now(),
        };

        await DB.setDoc(
          DB.doc(db, DB_COLLECTIONS.eventsBirthDateCard, existingEvent.id),
          updatedEvent
        );

        await this.updateBirthdayDot(
          existingEvent.id,
          newBirthDate,
          existingEvent.id
        );
      } else {
        const eventId = `${currentYear}-${month}-${day}-${Math.floor(
          Math.random() * 1000
        )}`;
        const newEvent: IBirthdayEvent = {
          id: eventId,
          memberId: memberData.id,
          name: memberData.name,
          birthDate: `${currentYear}-${month}-${day}`,
          gender: memberData.gender,
          profileImage: memberData.profileImage,
          year: currentYear,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };

        await DB.setDoc(
          DB.doc(db, DB_COLLECTIONS.eventsBirthDateCard, eventId),
          newEvent
        );

        await this.createBirthdayDot(eventId, `${currentYear}-${month}-${day}`);
      }
    } catch (error) {
      Log.error("Erro ao criar/atualizar evento de aniversário:", error);
      throw error;
    }
  }

  async createBirthdayDot(eventId: string, date: string): Promise<void> {
    try {
      const dotRef = DB.doc(db, DB_COLLECTIONS.dots, date);
      const querySnapshot = await DB.getDoc(dotRef);

      const newDot = {
        key: `aniversariante-${date}-${eventId}`,
      };

      if (querySnapshot.exists()) {
        const dataResponse = querySnapshot.data();
        const currentDots = dataResponse[date]?.dots || [];

        const dotExists = currentDots.some(
          (dot: any) => dot.key === newDot.key
        );
        if (dotExists) return;

        const updatedDots = [...currentDots, newDot];
        dataResponse[date] = { ...dataResponse[date], dots: updatedDots };

        await DB.setDoc(dotRef, dataResponse);
      } else {
        const schemaDot = {
          [date]: { dots: [newDot] },
        };
        await DB.setDoc(dotRef, schemaDot);
      }
    } catch (error) {
      Log.error("Erro ao criar dot de aniversário:", error);
      throw error;
    }
  }

  async updateBirthdayDot(
    eventId: string,
    newDate: string,
    oldEventId: string
  ): Promise<void> {
    try {
      const oldDate = await this.findBirthdayEventDate(oldEventId);
      if (oldDate) await this.removeBirthdayDot(oldEventId, oldDate);
      await this.createBirthdayDot(eventId, newDate);
    } catch (error) {
      Log.error("Erro ao atualizar dot de aniversário:", error);
      throw error;
    }
  }

  async removeBirthdayDot(eventId: string, date: string): Promise<void> {
    try {
      const dotRef = DB.doc(db, DB_COLLECTIONS.dots, date);
      const querySnapshot = await DB.getDoc(dotRef);

      if (querySnapshot.exists()) {
        const dataResponse = querySnapshot.data();
        const currentDots = dataResponse[date]?.dots || [];

        const filteredDots = currentDots.filter(
          (dot: any) => !dot.key.includes(eventId)
        );

        if (filteredDots.length === 0) {
          await DB.deleteDoc(dotRef);
        } else {
          dataResponse[date].dots = filteredDots;
          await DB.setDoc(dotRef, dataResponse);
        }
      }
    } catch (error) {
      Log.error("Erro ao remover dot de aniversário:", error);
      throw error;
    }
  }

  async findBirthdayEventDate(eventId: string): Promise<string | null> {
    try {
      const ref = DB.collection(db, DB_COLLECTIONS.eventsBirthDateCard);
      const q = DB.query(ref, DB.where("id", "==", eventId), DB.limit(1));
      const snapshot = await DB.getDocs(q);

      if (snapshot.empty) return null;

      const doc = snapshot.docs[0];
      return doc.data().birthDate;
    } catch (error) {
      Log.error("Erro ao buscar data do evento:", error);
      return null;
    }
  }

  async syncBirthdayEventsForNewYear(): Promise<void> {
    try {
      const currentYear = new Date().getFullYear();
      const ref = DB.collection(db, DB_COLLECTIONS.eventsBirthDateCard);

      const q = DB.query(
        ref,
        DB.where("year", "!=", currentYear),
        DB.orderBy("year", "desc")
      );
      const snapshot = await DB.getDocs(q);

      if (snapshot.empty) {
        Log.info(`Nenhuma sincronização necessária para ${currentYear}.`);
        return;
      }

      Log.info(`Iniciando sincronização para ${currentYear}...`);

      const batch = DB.writeBatch(db);
      const eventsToDelete: string[] = [];
      const dotsToRemove: Array<{ eventId: string; date: string }> = [];

      for (const docSnapshot of snapshot.docs) {
        const eventData = docSnapshot.data() as IBirthdayEvent;

        const birthDateParts = eventData.birthDate.split("-");
        const month = birthDateParts[1];
        const day = birthDateParts[0];

        const newEventId = `${currentYear}-${month}-${day}-${Math.floor(
          Math.random() * 1000
        )}`;
        const newEvent: IBirthdayEvent = {
          ...eventData,
          id: newEventId,
          year: currentYear,
          updatedAt: Date.now(),
        };

        const newEventRef = DB.doc(
          db,
          DB_COLLECTIONS.eventsBirthDateCard,
          newEventId
        );
        batch.set(newEventRef, newEvent);

        eventsToDelete.push(docSnapshot.id);
        dotsToRemove.push({
          eventId: docSnapshot.id,
          date: eventData.birthDate,
        });
      }

      await batch.commit();
      Log.success(`${eventsToDelete.length} novos eventos criados em lote`);

      const dotPromises = eventsToDelete.map(async (eventId, index) => {
        const eventData = snapshot.docs[index].data() as IBirthdayEvent;
        const birthDateParts = eventData.birthDate.split("-");
        const month = birthDateParts[1];
        const day = birthDateParts[0];
        const newDate = `${currentYear}-${month}-${day}`;

        return this.createBirthdayDot(eventId, newDate);
      });

      await Promise.all(dotPromises);
      Log.success("Dots criados em paralelo");

      const deleteBatch = DB.writeBatch(db);
      for (const eventId of eventsToDelete) {
        const eventRef = DB.doc(
          db,
          DB_COLLECTIONS.eventsBirthDateCard,
          eventId
        );
        deleteBatch.delete(eventRef);
      }

      await deleteBatch.commit();
      Log.success(`${eventsToDelete.length} eventos antigos removidos em lote`);

      const removeDotPromises = dotsToRemove.map(({ eventId, date }) =>
        this.removeBirthdayDot(eventId, date)
      );

      await Promise.all(removeDotPromises);
      Log.success("Dots antigos removidos em paralelo");

      Log.success(
        `Sincronização de eventos de aniversário para ${currentYear} concluída! ${eventsToDelete.length} eventos processados.`
      );
    } catch (error) {
      Log.error("Erro ao sincronizar eventos de aniversário:", error);
      throw error;
    }
  }

  async populateBirthdayEventsFromMembers(): Promise<void> {
    try {
      const membersRef = DB.collection(db, DB_COLLECTIONS.components);
      const membersSnapshot = await DB.getDocs(membersRef);

      const batchSize = 50;
      const membersWithBirthDate = membersSnapshot.docs.filter(
        (doc) => doc.data().birthDate
      );

      Log.info(
        `Processando ${membersWithBirthDate.length} membros com data de nascimento...`
      );

      for (let i = 0; i < membersWithBirthDate.length; i += batchSize) {
        const batch = membersWithBirthDate.slice(i, i + batchSize);

        const promises = batch.map(async (memberDoc) => {
          const memberData = memberDoc.data();
          return this.createOrUpdateBirthdayEvent({
            id: memberDoc.id,
            name: memberData.name,
            birthDate: memberData.birthDate,
            gender: memberData.gender || "",
            profileImage: memberData.profileImageUri || "",
          });
        });

        await Promise.all(promises);
        Log.success(`Lote ${Math.floor(i / batchSize) + 1} processado`);
      }

      Log.success("População de eventos de aniversário concluída!");
    } catch (error) {
      Log.error("Erro ao popular eventos de aniversário:", error);
      throw error;
    }
  }

  async cleanupOldBirthdayEvents(keepYear?: number): Promise<void> {
    try {
      const targetYear = keepYear || new Date().getFullYear();
      const ref = DB.collection(db, DB_COLLECTIONS.eventsBirthDateCard);
      const q = DB.query(ref, DB.where("year", "!=", targetYear));
      const snapshot = await DB.getDocs(q);

      if (snapshot.empty) {
        Log.info("Nenhum evento antigo para limpar.");
        return;
      }

      Log.info("Iniciando limpeza de eventos antigos...");

      const batch = DB.writeBatch(db);
      let deletedCount = 0;

      for (const docSnapshot of snapshot.docs) {
        try {
          const eventData = docSnapshot.data() as IBirthdayEvent;

          batch.delete(docSnapshot.ref);
          deletedCount++;
          this.removeBirthdayDot(docSnapshot.id, eventData.birthDate);
        } catch (error) {
          Log.error(`Erro ao processar evento ${docSnapshot.id}:`, error);
        }
      }
      await batch.commit();

      Log.success(
        `Limpeza concluída! ${deletedCount} eventos antigos removidos em lote.`
      );
    } catch (error) {
      Log.error("Erro na limpeza de eventos antigos:", error);
      throw error;
    }
  }
}
