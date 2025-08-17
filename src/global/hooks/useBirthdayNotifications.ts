import { useCallback } from "react";
import birthdayNotificationService from "../services/BirthdayNotificationService";
import { Log } from "../services/Logger";

export interface UseBirthdayNotificationsReturn {
  scheduleAllNotifications: (
    members: Array<{ id: string; name: string; birthDate: string }>
  ) => Promise<void>;
}

export const useBirthdayNotifications = (): UseBirthdayNotificationsReturn => {
  const scheduleAllNotifications = useCallback(
    async (
      members: Array<{ id: string; name: string; birthDate: string }>
    ): Promise<void> => {
      try {
        Log.loading(
          `Verificando notificações para ${members.length} membros...`
        );

        await birthdayNotificationService.scheduleAllBirthdayNotifications(
          members
        );

        Log.success("Verificação de notificações concluída");
      } catch (error) {
        Log.error("Erro ao verificar/agendar notificações:", error);
      }
    },
    []
  );

  return {
    scheduleAllNotifications,
  };
};
