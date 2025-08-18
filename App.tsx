import "./src/global/styles/global.css";
import { JSX, useEffect, useState } from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as FontPoppins from "@expo-google-fonts/poppins";
import * as FontRubik from "@expo-google-fonts/rubik";
import {
  setBackgroundColorAsync,
  setButtonStyleAsync,
} from "expo-navigation-bar";
import { colors } from "@styles/colors";
import RootNavigator from "@navigation/index";
import SplashScreen from "features/splash/SplashScreen";

import useCheckForUpdate from "@hooks/useCheckForUpdate";
import { getLoggerConfig } from "global/configs/logger";
import { Log } from "@services/index";
import { useBirthdaySync } from "@hooks/index";
import { useAuthStore } from "@features/auth/stores/authStore";

enum AppState {
  Loading,
  Splash,
  Main,
}

export default function App() {
  const [fontsLoaded] = FontPoppins.useFonts({
    Poppins_400Regular: FontPoppins.Poppins_400Regular,
    Poppins_500Medium: FontPoppins.Poppins_500Medium,
    Poppins_600SemiBold: FontPoppins.Poppins_600SemiBold,
    Poppins_700Bold: FontPoppins.Poppins_700Bold,
    Rubik_400Regular: FontRubik.Rubik_500Medium,
    Rubik_500Medium: FontRubik.Rubik_500Medium,
    Rubik_600SemiBold: FontRubik.Rubik_600SemiBold,
    Rubik_700Bold: FontRubik.Rubik_700Bold,
  });

  useCheckForUpdate();

  const queryClient = new QueryClient();

  const { loadUserFromStorage } = useAuthStore();

  const [appState, setAppState] = useState<AppState>(AppState.Loading);

  useBirthdaySync({
    delay: 2000,
    autoSync: true,
  });

  const initApp = () => {
    setTimeout(() => setAppState(AppState.Main), 2500);
    loadUserFromStorage();
    setBackgroundColorAsync(colors.background);
    setButtonStyleAsync("dark");

    Log.success("Aplicação iniciada com sucesso!", {
      environment: process.env.EXPO_PUBLIC_ENV,
    });
  };

  const initializeNotificationServices = async () => {
    try {
      const { birthdayNotificationService } = await import("@services/index");
      const success = await birthdayNotificationService.initialize();
      if (success) Log.success("Serviços de notificação inicializados");
    } catch (error) {
      Log.error("Erro ao inicializar serviços de notificação:", error);
      throw error;
    }
  };

  useEffect(() => {
    const config = getLoggerConfig();
    Log.configure(config);
    initApp();

    const timer = setTimeout(initializeNotificationServices, 1000);
    return () => clearTimeout(timer);
  }, []);

  const renderContent = () => {
    const stateComponents: Record<AppState, JSX.Element> = {
      [AppState.Loading]: <SplashScreen />,
      [AppState.Splash]: <SplashScreen />,
      [AppState.Main]: (
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer>
            <BottomSheetModalProvider>
              <KeyboardProvider>
                <QueryClientProvider client={queryClient}>
                  <RootNavigator />
                </QueryClientProvider>
              </KeyboardProvider>
            </BottomSheetModalProvider>
          </NavigationContainer>
        </GestureHandlerRootView>
      ),
    };

    return !fontsLoaded ? <SplashScreen /> : stateComponents[appState];
  };

  return (
    <SafeAreaProvider>
      <View className="flex-1 bg-primary">{renderContent()}</View>
    </SafeAreaProvider>
  );
}
