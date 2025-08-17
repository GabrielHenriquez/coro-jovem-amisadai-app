export default {
  expo: {
    name: "Coro Jovem Amisadai",
    slug: "coro-jovem-amisadai-app",
    version: "1.0.1",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#4C5E46",
    },
    runtimeVersion: "1.0.1",
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/icon.png",
        backgroundColor: "#4C5E46",
      },
      edgeToEdgeEnabled: false,
      permissions: [
        "android.permission.RECORD_AUDIO",
        "android.permission.READ_EXTERNAL_STORAGE",
        "android.permission.WRITE_EXTERNAL_STORAGE",
        "android.permission.DOWNLOAD_WITHOUT_NOTIFICATION",
        "android.permission.ACCESS_NETWORK_STATE",
        "android.permission.VIBRATE",
        "android.permission.WAKE_LOCK",
        "android.permission.RECEIVE_BOOT_COMPLETED",
      ],
      package: "com.gabrielrick2941.corojovemamisadaiapp",
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    plugins: [
      [
        "expo-secure-store",
        {
          configureAndroidBackup: false,
          faceIDPermission:
            "Allow Aluno Docs to access your Face ID biometric data.",
        },
      ],
      [
        "expo-image-picker",
        {
          photosPermission:
            "The app accesses your photos to let you share them with your friends.",
        },
      ],
      [
        "expo-notifications",
        {
          icon: "./assets/notification-icon.png",
          color: "#4C5E46",
        },
      ],
      "@config-plugins/react-native-blob-util",
      "@config-plugins/react-native-pdf",
    ],
    updates: {
      url: "https://u.expo.dev/ed325c7a-315c-4690-b6cf-562109b1b7a5",
    },
    extra: {
      eas: {
        projectId: "ed325c7a-315c-4690-b6cf-562109b1b7a5",
      },
      API_KEY: process.env.API_KEY,
      APP_ID: process.env.APP_ID,
      AUTH_DOMAIN: process.env.AUTH_DOMAIN,
      MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID,
      PROJECT_ID: process.env.PROJECT_ID,
      STORAGE_BUCKET: process.env.STORAGE_BUCKET,
      ENV: process.env.ENV,
    },
    owner: "gabrielrick2941",
  },
};
