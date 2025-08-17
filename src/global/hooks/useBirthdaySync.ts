import { useEffect, useRef, useCallback } from "react";
import { birthdaySyncStorage } from "../services/BirthdaySyncStorage";
import { birthdaySyncChecker } from "../services/BirthdaySyncChecker";
import { birthdaySyncExecutor } from "../services/BirthdaySyncExecutor";
import { Log } from "../services/Logger";

interface BirthdaySyncConfig {
  delay?: number;
  autoSync?: boolean;
}

export const useBirthdaySync = (config: BirthdaySyncConfig = {}) => {
  const { delay = 2000, autoSync = true } = config;

  const isMounted = useRef(true);
  const syncTimeout = useRef<NodeJS.Timeout | undefined>(undefined);
  const syncInProgress = useRef(false);

  const checkAndSyncBirthdays = useCallback(async () => {
    if (syncInProgress.current) {
      Log.warning("Sincronização já em andamento, aguardando...");
      return;
    }

    if (!birthdaySyncStorage.shouldSync()) {
      Log.info("Sincronização não necessária hoje");
      return;
    }

    if (!birthdaySyncStorage.canRetry()) {
      Log.warning("Rate limit ativo, aguardando próxima tentativa");
      return;
    }

    syncInProgress.current = true;
    birthdaySyncStorage.markSyncAttempt();

    try {
      Log.info("Iniciando verificação de sincronização...");

      if (!isMounted.current) return;

      const checkResult = await birthdaySyncChecker.checkIfSyncNeeded();

      if (!isMounted.current) return;

      if (checkResult.needsSync) {
        Log.info(`Sincronização necessária: ${checkResult.reason}`);

        if (!birthdaySyncExecutor.canExecute()) {
          const cooldown = birthdaySyncExecutor.getCooldownRemaining();
          Log.warning(`Executor em cooldown, aguardando ${cooldown}s`);
          return;
        }

        const result = await birthdaySyncExecutor.executeSync();

        if (!isMounted.current) return;

        if (result.success) {
          Log.success("Sincronização executada com sucesso!");
          birthdaySyncStorage.markSyncSuccess();
        } else {
          Log.error(`Falha na sincronização: ${result.message}`);
        }
      } else {
        Log.info("Nenhuma sincronização necessária");
        birthdaySyncStorage.markSyncSuccess();
      }
    } catch (error) {
      if (isMounted.current) {
        Log.error(
          `Erro na verificação: ${
            error instanceof Error ? error.message : "Erro desconhecido"
          }`
        );
      }
    } finally {
      syncInProgress.current = false;
    }
  }, []);

  const forceSync = useCallback(async () => {
    if (syncInProgress.current) {
      Log.warning("Sincronização já em andamento");
      return false;
    }

    try {
      Log.info("Forçando sincronização manual...");

      birthdaySyncChecker.clearCheckCache();

      const result = await birthdaySyncExecutor.forceExecute();

      if (result.success) {
        Log.success("Sincronização manual executada com sucesso!");
        birthdaySyncStorage.markSyncSuccess();
        return true;
      } else {
        Log.error(`Falha na sincronização manual: ${result.message}`);
        return false;
      }
    } catch (error) {
      Log.error(
        `Erro na sincronização manual: ${
          error instanceof Error ? error.message : "Erro desconhecido"
        }`
      );
      return false;
    }
  }, []);

  const getSyncStatus = useCallback(() => {
    const storageStats = birthdaySyncStorage.getSyncStats();
    const executorStatus = birthdaySyncExecutor.getExecutionStatus();
    const checkerCached = birthdaySyncChecker.isCheckCached();

    return {
      storage: storageStats,
      executor: executorStatus,
      checker: {
        isCached: checkerCached,
      },
      overall: {
        isInProgress: syncInProgress.current,
        canSync:
          birthdaySyncStorage.shouldSync() && birthdaySyncStorage.canRetry(),
        lastSync: storageStats.lastSync,
      },
    };
  }, []);

  const clearCache = useCallback(() => {
    birthdaySyncStorage.clearSyncCache();
    birthdaySyncChecker.clearCheckCache();
    birthdaySyncExecutor.reset();
    Log.info("Cache limpo com sucesso");
  }, []);

  useEffect(() => {
    if (!autoSync) return;

    syncTimeout.current = setTimeout(
      () => isMounted.current && checkAndSyncBirthdays(),
      delay
    );

    return () => {
      isMounted.current = false;
      syncTimeout.current && clearTimeout(syncTimeout.current);
    };
  }, [delay, autoSync, checkAndSyncBirthdays]);

  return {
    forceSync,
    checkAndSyncBirthdays,
    clearCache,
    getSyncStatus,
    isSyncInProgress: syncInProgress.current,

    storage: birthdaySyncStorage,
    checker: birthdaySyncChecker,
    executor: birthdaySyncExecutor,
  };
};
