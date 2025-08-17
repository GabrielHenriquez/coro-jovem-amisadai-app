import { LogConfig } from "../services/Logger";

export const LOGGER_CONFIG: LogConfig = {
  enableConsole: true,
  minLevel: "info",
  includeTimestamp: true,
  includeContext: true,
  maxLogSize: 1000,
};

export const DEV_LOGGER_CONFIG: LogConfig = {
  ...LOGGER_CONFIG,
  minLevel: "debug",
  enableConsole: true,
};

export const PROD_LOGGER_CONFIG: LogConfig = {
  ...LOGGER_CONFIG,
  minLevel: "warning",
  enableConsole: false,
};

export const getLoggerConfig = (): LogConfig => {
  const env = process.env.EXPO_PUBLIC_ENV;

  switch (env) {
    case "PRODUCTION":
      return PROD_LOGGER_CONFIG;
    case "STAGING":
      return DEV_LOGGER_CONFIG;
    case "DEVELOPMENT":
    default:
      return LOGGER_CONFIG;
  }
};
