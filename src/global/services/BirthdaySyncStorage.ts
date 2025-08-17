import { MMKV } from "react-native-mmkv";
import { Log } from "./Logger";

export interface BirthdaySyncStatus {
  year: number;
  timestamp: number;
  lastAttempt?: number;
  attemptsCount?: number;
}

const DEFAULT_CONFIG = {
  cacheKey: "lastBirthdaySync",
  maxAttempts: 3,
  retryDelay: 30000,
};

export class BirthdaySyncStorage {
  private storage: MMKV;
  private config: typeof DEFAULT_CONFIG;

  constructor(config: Partial<typeof DEFAULT_CONFIG> = {}) {
    this.storage = new MMKV();
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  getLastSyncStatus(): BirthdaySyncStatus | null {
    try {
      const data = this.storage.getString(this.config.cacheKey);
      if (!data) return null;

      return JSON.parse(data) as BirthdaySyncStatus;
    } catch (error) {
      Log.error("Erro ao ler status de sincronização:", error);
      return null;
    }
  }

  setLastSyncStatus(status: BirthdaySyncStatus): void {
    try {
      this.storage.set(this.config.cacheKey, JSON.stringify(status));
    } catch (error) {
      Log.error("Erro ao salvar status de sincronização:", error);
    }
  }

  shouldSync(): boolean {
    const status = this.getLastSyncStatus();
    if (!status) return true;

    const currentYear = new Date().getFullYear();
    const today = new Date().toDateString();
    const lastSyncDate = new Date(status.timestamp).toDateString();

    return (
      status.year !== currentYear || lastSyncDate !== today || !status.timestamp
    );
  }

  canRetry(): boolean {
    const status = this.getLastSyncStatus();
    if (!status || !status.lastAttempt) return true;

    const now = Date.now();
    const timeSinceLastAttempt = now - status.lastAttempt;
    const attemptsCount = status.attemptsCount || 0;

    return (
      timeSinceLastAttempt >= this.config.retryDelay &&
      attemptsCount < this.config.maxAttempts
    );
  }

  markSyncAttempt(): void {
    const status = this.getLastSyncStatus() || {
      year: new Date().getFullYear(),
      timestamp: 0,
      attemptsCount: 0,
    };

    const updatedStatus: BirthdaySyncStatus = {
      ...status,
      lastAttempt: Date.now(),
      attemptsCount: (status.attemptsCount || 0) + 1,
    };

    this.setLastSyncStatus(updatedStatus);
  }

  markSyncSuccess(): void {
    const currentYear = new Date().getFullYear();
    const now = Date.now();

    const successStatus: BirthdaySyncStatus = {
      year: currentYear,
      timestamp: now,
      lastAttempt: now,
      attemptsCount: 0,
    };

    this.setLastSyncStatus(successStatus);
  }

  clearSyncCache(): void {
    try {
      this.storage.delete(this.config.cacheKey);
    } catch (error) {
      Log.error("Erro ao limpar cache de sincronização:", error);
    }
  }

  getSyncStats(): {
    lastSync: Date | null;
    lastAttempt: Date | null;
    attemptsCount: number;
    daysSinceLastSync: number;
  } {
    const status = this.getLastSyncStatus();
    if (!status) {
      return {
        lastSync: null,
        lastAttempt: null,
        attemptsCount: 0,
        daysSinceLastSync: 0,
      };
    }

    const now = new Date();
    const lastSync = new Date(status.timestamp);
    const lastAttempt = status.lastAttempt
      ? new Date(status.lastAttempt)
      : null;
    const daysSinceLastSync = Math.floor(
      (now.getTime() - lastSync.getTime()) / (1000 * 60 * 60 * 24)
    );

    return {
      lastSync,
      lastAttempt,
      attemptsCount: status.attemptsCount || 0,
      daysSinceLastSync,
    };
  }

  isCacheValid(): boolean {
    const status = this.getLastSyncStatus();
    if (!status) return false;

    const now = Date.now();
    const cacheAge = now - status.timestamp;
    const maxCacheAge = 24 * 60 * 60 * 1000;

    return cacheAge < maxCacheAge;
  }

  expireCache(): void {
    const status = this.getLastSyncStatus();
    if (status) {
      const expiredStatus: BirthdaySyncStatus = {
        ...status,
        timestamp: 0,
      };
      this.setLastSyncStatus(expiredStatus);
    }
  }
}

export const birthdaySyncStorage = new BirthdaySyncStorage();

export const useBirthdaySyncStorage = () => {
  return birthdaySyncStorage;
};
