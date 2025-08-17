import { FirebaseEventsService } from "@features/calls/domain/services/FirebaseEventsService";
import { Log } from "./Logger";

export class BirthdaySyncExecutor {
  private static instance: BirthdaySyncExecutor;
  private syncInProgress: boolean = false;
  private lastSyncExecution: number = 0;
  private readonly EXECUTION_COOLDOWN = 60000;

  private constructor() {}

  public static getInstance(): BirthdaySyncExecutor {
    if (!BirthdaySyncExecutor.instance) {
      BirthdaySyncExecutor.instance = new BirthdaySyncExecutor();
    }
    return BirthdaySyncExecutor.instance;
  }

  async executeSync(): Promise<{
    success: boolean;
    message: string;
    eventsProcessed?: number;
    error?: string;
  }> {
    if (this.syncInProgress) {
      return {
        success: false,
        message: "Sincronização já está em andamento",
      };
    }

    const now = Date.now();
    if (now - this.lastSyncExecution < this.EXECUTION_COOLDOWN) {
      const remainingTime = Math.ceil(
        (this.EXECUTION_COOLDOWN - (now - this.lastSyncExecution)) / 1000
      );
      return {
        success: false,
        message: `Aguarde ${remainingTime} segundos para próxima execução`,
      };
    }

    this.syncInProgress = true;
    this.lastSyncExecution = now;

    try {
      Log.info("Iniciando execução da sincronização...");

      const service = new FirebaseEventsService();
      await service.syncBirthdayEventsForNewYear();

      Log.success("Sincronização executada com sucesso!");

      return {
        success: true,
        message: "Sincronização concluída com sucesso!",
        eventsProcessed: 0,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Erro desconhecido";
      Log.error("Erro na execução da sincronização:", error);

      return {
        success: false,
        message: "Falha na sincronização",
        error: errorMessage,
      };
    } finally {
      this.syncInProgress = false;
    }
  }

  isExecuting(): boolean {
    return this.syncInProgress;
  }

  canExecute(): boolean {
    const now = Date.now();
    return (
      !this.syncInProgress &&
      now - this.lastSyncExecution >= this.EXECUTION_COOLDOWN
    );
  }

  getCooldownRemaining(): number {
    const now = Date.now();
    const timeSinceLastExecution = now - this.lastSyncExecution;
    const remaining = this.EXECUTION_COOLDOWN - timeSinceLastExecution;

    return Math.max(0, Math.ceil(remaining / 1000));
  }

  async forceExecute(): Promise<{
    success: boolean;
    message: string;
    eventsProcessed?: number;
    error?: string;
  }> {
    this.lastSyncExecution = 0;
    return this.executeSync();
  }

  getExecutionStatus(): {
    isExecuting: boolean;
    canExecute: boolean;
    cooldownRemaining: number;
    lastExecution: Date | null;
  } {
    return {
      isExecuting: this.syncInProgress,
      canExecute: this.canExecute(),
      cooldownRemaining: this.getCooldownRemaining(),
      lastExecution:
        this.lastSyncExecution > 0 ? new Date(this.lastSyncExecution) : null,
    };
  }

  reset(): void {
    this.syncInProgress = false;
    this.lastSyncExecution = 0;
  }
}

export const birthdaySyncExecutor = BirthdaySyncExecutor.getInstance();

export const useBirthdaySyncExecutor = () => {
  return birthdaySyncExecutor;
};
