import { collection, query, where, limit, getDocs } from "firebase/firestore";
import { db } from "../configs/firebase";
import { Log } from "./Logger";
import { DB_COLLECTIONS } from "global/constants/DB_COLLECTIONS";

export interface SyncCheckResult {
  needsSync: boolean;
  reason?: string;
  eventsCount?: number;
  currentYear: number;
}

export class BirthdaySyncChecker {
  private static instance: BirthdaySyncChecker;
  private lastCheck: number = 0;
  private readonly CHECK_CACHE_TTL = 60000;

  private constructor() {}

  public static getInstance(): BirthdaySyncChecker {
    if (!BirthdaySyncChecker.instance) {
      BirthdaySyncChecker.instance = new BirthdaySyncChecker();
    }
    return BirthdaySyncChecker.instance;
  }

  async checkIfSyncNeeded(): Promise<SyncCheckResult> {
    const now = Date.now();
    const currentYear = new Date().getFullYear();

    if (now - this.lastCheck < this.CHECK_CACHE_TTL) {
      return {
        needsSync: false,
        reason: "Cache de verificação ainda válido",
        currentYear,
      };
    }

    try {
      const ref = collection(db, DB_COLLECTIONS.eventsBirthDateCard);
      const q = query(ref, where("year", "!=", currentYear), limit(1));

      const snapshot = await getDocs(q);
      this.lastCheck = now;

      if (snapshot.empty) {
        return {
          needsSync: false,
          reason: "Nenhum evento de anos anteriores encontrado",
          currentYear,
        };
      }

      const detailedResult = await this.getDetailedSyncInfo(currentYear);

      return {
        needsSync: true,
        reason: `Encontrados ${detailedResult.eventsCount} eventos de anos anteriores`,
        eventsCount: detailedResult.eventsCount,
        currentYear,
      };
    } catch (error) {
      Log.error("Erro ao verificar necessidade de sincronização:", error);

      return {
        needsSync: true,
        reason: "Erro na verificação - sincronizando por segurança",
        currentYear,
      };
    }
  }

  private async getDetailedSyncInfo(
    currentYear: number
  ): Promise<{ eventsCount: number }> {
    try {
      const ref = collection(db, DB_COLLECTIONS.eventsBirthDateCard);
      const q = query(ref, where("year", "!=", currentYear));

      const snapshot = await getDocs(q);

      return {
        eventsCount: snapshot.size,
      };
    } catch (error) {
      Log.error("Erro ao obter informações detalhadas:", error);
      return { eventsCount: 0 };
    }
  }

  async hasEventsFromYear(year: number): Promise<boolean> {
    try {
      const ref = collection(db, DB_COLLECTIONS.eventsBirthDateCard);
      const q = query(ref, where("year", "==", year), limit(1));

      const snapshot = await getDocs(q);
      return !snapshot.empty;
    } catch (error) {
      Log.error(`Erro ao verificar eventos do ano ${year}:`, error);
      return false;
    }
  }

  async hasEventsFromPreviousYears(): Promise<boolean> {
    const currentYear = new Date().getFullYear();
    return this.hasEventsFromYear(currentYear - 1);
  }

  async getEventsByYearStats(): Promise<{ [year: number]: number }> {
    try {
      const ref = collection(db, DB_COLLECTIONS.eventsBirthDateCard);
      const snapshot = await getDocs(ref);

      const stats: { [year: number]: number } = {};

      snapshot.docs.forEach((doc) => {
        const data = doc.data();
        const year = data.year;
        if (year) {
          stats[year] = (stats[year] || 0) + 1;
        }
      });

      return stats;
    } catch (error) {
      Log.error("Erro ao obter estatísticas por ano:", error);
      return {};
    }
  }

  isCheckCached(): boolean {
    const now = Date.now();
    return now - this.lastCheck < this.CHECK_CACHE_TTL;
  }

  clearCheckCache(): void {
    this.lastCheck = 0;
  }

  async forceCheck(): Promise<SyncCheckResult> {
    this.clearCheckCache();
    return this.checkIfSyncNeeded();
  }
}

export const birthdaySyncChecker = BirthdaySyncChecker.getInstance();

export const useBirthdaySyncChecker = () => {
  return birthdaySyncChecker;
};
