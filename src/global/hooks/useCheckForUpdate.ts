import * as Updates from "expo-updates";
import * as Device from "expo-device";
import { Alert } from "react-native";
import { useEffect } from "react";
import { Log } from "../services/Logger";

const useCheckForUpdate = () => {
  useEffect(() => {
    const checkForUpdates = async () => {
      try {
        const update = await Updates.checkForUpdateAsync();

        if (update.isAvailable) {
          await Updates.fetchUpdateAsync();

          Alert.alert(
            "Atualização disponível",
            "Uma nova versão foi baixada. Reinicie o app para aplicar as mudanças.",
            [
              { text: "Reiniciar agora", onPress: () => Updates.reloadAsync() },
              { text: "Mais tarde", style: "cancel" },
            ]
          );
        }
      } catch (error) {
        Log.error("Erro ao verificar atualização:", error);
      }
    };

    if (Device.isDevice) {
      checkForUpdates();
    }
  }, []);
};

export default useCheckForUpdate;
