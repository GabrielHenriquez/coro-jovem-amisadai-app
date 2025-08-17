import { useCallback, useRef } from "react";
import { Log } from "@services/Logger";
import { birthdayNotificationService } from "@services/index";
import { useEventsQueries } from "./useEventsQueries";

export const useBirthdayEvents = () => {
  const { repository } = useEventsQueries();

  const operationInProgress = useRef<boolean>(false);

  const debounceTimeout = useRef<NodeJS.Timeout | undefined>(undefined);

  const createOrUpdateBirthdayEvent = useCallback(
    async (memberData: {
      id: string;
      name: string;
      birthDate: string;
      gender: string;
      profileImage: string;
    }) => {
      if (operationInProgress.current) {
        Log.debug("Operação de aniversário já em andamento, aguardando...");
        return;
      }

      try {
        operationInProgress.current = true;

        if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

        debounceTimeout.current = setTimeout(async () => {
          try {
            await repository.createOrUpdateBirthdayEvent(memberData);
            Log.success("Evento de aniversário criado/atualizado com sucesso!");

            try {
              const [day, month, year] = memberData.birthDate
                .split("/")
                .map(Number);
              const birthDate = new Date(year, month - 1, day);
              await birthdayNotificationService.scheduleBirthdayNotification(
                memberData.name,
                birthDate,
                memberData.id
              );
              Log.success(
                `Notificação de aniversário agendada para ${memberData.name}`
              );
            } catch (notificationError) {
              Log.warning(
                `Não foi possível agendar notificação para ${memberData.name}:`,
                notificationError
              );
            }
          } catch (error) {
            Log.error("Erro ao criar/atualizar evento de aniversário:", error);
          } finally {
            operationInProgress.current = false;
          }
        }, 300);
      } catch (error) {
        operationInProgress.current = false;
        Log.error("Erro ao agendar operação de aniversário:", error);
      }
    },
    [repository]
  );

  const syncBirthdayEventsForNewYear = useCallback(async () => {
    if (operationInProgress.current) return;

    try {
      operationInProgress.current = true;

      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

      debounceTimeout.current = setTimeout(async () => {
        try {
          await repository.syncBirthdayEventsForNewYear();
        } catch (error) {
          Log.error("Erro ao sincronizar eventos de aniversário:", error);
        } finally {
          operationInProgress.current = false;
        }
      }, 500);
    } catch (error) {
      operationInProgress.current = false;
      Log.error("Erro ao agendar sincronização:", error);
    }
  }, [repository]);

  const cleanup = useCallback(() => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    operationInProgress.current = false;
  }, []);

  return {
    createOrUpdateBirthdayEvent,
    syncBirthdayEventsForNewYear,
    cleanup,
    isOperationInProgress: operationInProgress.current,
  };
};
