import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { Log } from "./Logger";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export interface BirthdayNotification {
  id: string;
  title: string;
  body: string;
  data?: Record<string, any>;
  scheduledDate: Date;
}

export class BirthdayNotificationService {
  private static instance: BirthdayNotificationService;
  private isInitialized = false;

  private constructor() {}

  public static getInstance(): BirthdayNotificationService {
    if (!BirthdayNotificationService.instance) {
      BirthdayNotificationService.instance = new BirthdayNotificationService();
    }
    return BirthdayNotificationService.instance;
  }

  async initialize(): Promise<boolean> {
    if (this.isInitialized) return true;

    try {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        Log.warning("Permissão para notificações negada");
        return false;
      }

      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("birthday", {
          name: "Aniversários",
          importance: Notifications.AndroidImportance.HIGH,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
          sound: "default",
          enableVibrate: true,
          showBadge: true,
        });
      }

      this.isInitialized = true;
      Log.success("Serviço de notificações inicializado com sucesso");
      return true;
    } catch (error) {
      Log.error("Erro ao inicializar serviço de notificações:", error);
      return false;
    }
  }

  async scheduleBirthdayNotification(
    memberName: string,
    birthDate: Date,
    memberId: string
  ): Promise<string | null> {
    try {
      if (!this.isInitialized) {
        const initialized = await this.initialize();
        if (!initialized) return null;
      }

      const now = new Date();
      const currentYear = now.getFullYear();

      const notificationDate = new Date(
        currentYear,
        birthDate.getMonth(),
        birthDate.getDate()
      );
      notificationDate.setHours(9, 0, 0, 0);

      if (notificationDate <= now) {
        notificationDate.setFullYear(currentYear + 1);
      }

      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: "🎉 Aniversário Hoje!",
          body: `Hoje é aniversário de ${memberName}! Deseje Parabéns!`,
          data: {
            memberId,
            memberName,
            birthDate: birthDate.toISOString(),
            type: "birthday",
          },
          sound: "default",
          priority: Notifications.AndroidNotificationPriority.HIGH,
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DATE,
          date: notificationDate,
        },
      });

      Log.success(
        `🎉 Notificação agendada para ${memberName} em ${notificationDate.toLocaleDateString()} às ${notificationDate.toLocaleTimeString()}`
      );
      return notificationId;
    } catch (error) {
      Log.error(`Erro ao agendar notificação para ${memberName}:`, error);
      return null;
    }
  }

  async scheduleAllBirthdayNotifications(
    members: Array<{ id: string; name: string; birthDate: string }>
  ): Promise<void> {
    try {
      if (!this.isInitialized) {
        const initialized = await this.initialize();
        if (!initialized) return;
      }

      const existingNotifications = await this.getBirthdayNotifications();
      const existingMemberIds = new Set(
        existingNotifications
          .map((n) => n.content.data?.memberId)
          .filter(Boolean)
      );

      const membersNeedingNotifications = members.filter(
        (member) => !existingMemberIds.has(member.id)
      );

      if (membersNeedingNotifications.length === 0) {
        Log.success("Todas as notificações já estão agendadas");
        return;
      }

      Log.info(
        `Agendando notificações para ${membersNeedingNotifications.length} membros...`
      );

      let scheduledCount = 0;
      for (const member of membersNeedingNotifications) {
        try {
          const [day, month, year] = member.birthDate.split("/").map(Number);
          const birthDate = new Date(year, month - 1, day);

          const notificationId = await this.scheduleBirthdayNotification(
            member.name,
            birthDate,
            member.id
          );

          if (notificationId) {
            scheduledCount++;
          }
        } catch (error) {
          Log.error(`Erro ao agendar notificação para ${member.name}:`, error);
        }
      }

      Log.success(`${scheduledCount} notificações agendadas com sucesso`);
    } catch (error) {
      Log.error("Erro ao agendar notificações de aniversário:", error);
    }
  }

  async cancelBirthdayNotification(notificationId: string): Promise<void> {
    try {
      await Notifications.cancelScheduledNotificationAsync(notificationId);
      Log.info(`Notificação ${notificationId} cancelada com sucesso`);
    } catch (error) {
      Log.error(`Erro ao cancelar notificação ${notificationId}:`, error);
    }
  }

  async cancelAllBirthdayNotifications(): Promise<void> {
    try {
      const scheduledNotifications =
        await Notifications.getAllScheduledNotificationsAsync();

      const birthdayNotifications = scheduledNotifications.filter(
        (notification) => notification.content.data?.type === "birthday"
      );

      for (const notification of birthdayNotifications) {
        await Notifications.cancelScheduledNotificationAsync(
          notification.identifier
        );
      }

      Log.info(
        `${birthdayNotifications.length} notificações de aniversário canceladas`
      );
    } catch (error) {
      Log.error("Erro ao cancelar notificações de aniversário:", error);
    }
  }

  async getScheduledNotifications(): Promise<
    Notifications.NotificationRequest[]
  > {
    try {
      return await Notifications.getAllScheduledNotificationsAsync();
    } catch (error) {
      Log.error("Erro ao obter notificações agendadas:", error);
      return [];
    }
  }

  async getBirthdayNotifications(): Promise<
    Notifications.NotificationRequest[]
  > {
    try {
      const allNotifications = await this.getScheduledNotifications();
      return allNotifications.filter(
        (notification) => notification.content.data?.type === "birthday"
      );
    } catch (error) {
      Log.error("Erro ao obter notificações de aniversário:", error);
      return [];
    }
  }

  isServiceInitialized(): boolean {
    return this.isInitialized;
  }

  async getPermissionStatus(): Promise<Notifications.PermissionStatus> {
    try {
      const { status } = await Notifications.getPermissionsAsync();
      return status;
    } catch (error) {
      Log.error("Erro ao obter status das permissões:", error);
      return Notifications.PermissionStatus.DENIED;
    }
  }
}

export default BirthdayNotificationService.getInstance();
