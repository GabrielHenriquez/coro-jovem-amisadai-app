export type LogLevel =
  | "debug"
  | "info"
  | "success"
  | "loading"
  | "warning"
  | "error"
  | "critical";

export interface LogConfig {
  enableConsole?: boolean;
  minLevel?: LogLevel;
  includeTimestamp?: boolean;
  includeContext?: boolean;
  maxLogSize?: number;
}

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: string;
  data?: any;
  stack?: string;
}

const DEFAULT_CONFIG: LogConfig = {
  enableConsole: true,
  minLevel: "info",
  includeTimestamp: true,
  includeContext: true,
  maxLogSize: 1000,
};

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  success: 2,
  loading: 3,
  warning: 4,
  error: 5,
  critical: 6,
};

const LOG_EMOJIS: Record<LogLevel, string> = {
  debug: "🔍 ",
  info: "ℹ️ ",
  success: "✅",
  loading: "🔄",
  warning: "⚠️",
  error: "❌",
  critical: "🚨 ",
};

export class Logger {
  private static instance: Logger;
  private config: LogConfig;
  private logs: LogEntry[] = [];
  private context: string = "App";

  private constructor(config: Partial<LogConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  public static getInstance(config?: Partial<LogConfig>): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger(config);
    }
    return Logger.instance;
  }

  setContext(context: string): Logger {
    this.context = context;
    return this;
  }

  private log(
    level: LogLevel,
    message: string,
    data?: any,
    error?: Error
  ): void {
    if (LOG_LEVELS[level] < LOG_LEVELS[this.config.minLevel!]) return;

    const timestamp = new Date().toISOString();
    const entry: LogEntry = {
      timestamp,
      level,
      message,
      context: this.config.includeContext ? this.context : undefined,
      data,
      stack: error?.stack,
    };

    this.logs.push(entry);

    if (this.logs.length > this.config.maxLogSize!)
      this.logs = this.logs.slice(-this.config.maxLogSize!);

    if (this.config.enableConsole) this.logToConsole(entry);
  }

  private logToConsole(entry: LogEntry): void {
    const { level, message, context, data, stack } = entry;
    const emoji = LOG_EMOJIS[level];
    const timestamp = this.config.includeTimestamp
      ? `[${new Date(entry.timestamp).toLocaleTimeString()}]`
      : "";
    const contextStr = context ? `[${context}]` : "";

    const mainMessage = `${emoji} ${timestamp}${contextStr} ${message}`;

    if (typeof console !== "undefined" && console.log) {
      if (level === "error" || level === "critical") {
        console.error(mainMessage, data ? data : "");
      } else if (level === "warning") {
        console.warn(mainMessage, data ? data : "");
      } else {
        console.log(mainMessage, data ? data : "");
      }

      if (stack && (level === "error" || level === "critical")) {
        console.log("📚 Stack:", stack);
      }
    }
  }

  debug(message: string, data?: any): void {
    this.log("debug", message, data);
  }

  info(message: string, data?: any): void {
    this.log("info", message, data);
  }

  success(message: string, data?: any): void {
    this.log("success", message, data);
  }

  loading(message: string, data?: any): void {
    this.log("loading", message, data);
  }

  warning(message: string, data?: any): void {
    this.log("warning", message, data);
  }

  error(message: string, data?: any, error?: Error): void {
    this.log("error", message, data, error);
  }

  critical(message: string, data?: any, error?: Error): void {
    this.log("critical", message, data, error);
  }

  time(label: string): void {
    if (this.config.enableConsole && typeof console !== "undefined") {
      console.time(`⏱️ ${label}`);
    }
  }

  timeEnd(label: string): void {
    if (this.config.enableConsole && typeof console !== "undefined") {
      console.timeEnd(`⏱️ ${label}`);
    }
  }

  table(data: any): void {
    if (this.config.enableConsole && typeof console !== "undefined") {
      console.table(data);
    }
  }

  getLogs(): LogEntry[] {
    return [...this.logs];
  }

  getLogsByLevel(level: LogLevel): LogEntry[] {
    return this.logs.filter((log) => log.level === level);
  }

  getLogsByContext(context: string): LogEntry[] {
    return this.logs.filter((log) => log.context === context);
  }

  clearLogs(): void {
    this.logs = [];
  }

  exportLogs(): string {
    return JSON.stringify(this.logs, null, 2);
  }

  configure(config: Partial<LogConfig>): void {
    this.config = { ...this.config, ...config };
  }

  getConfig(): LogConfig {
    return { ...this.config };
  }

  group(label: string): void {
    if (this.config.enableConsole && typeof console !== "undefined") {
      console.group(`📁 ${label}`);
    }
  }

  groupEnd(): void {
    if (this.config.enableConsole && typeof console !== "undefined") {
      console.groupEnd();
    }
  }

  trace(message: string): void {
    if (this.config.enableConsole && typeof console !== "undefined") {
      console.trace(`🔍 ${message}`);
    }
  }
}

export const logger = Logger.getInstance();

export const Log = {
  debug: (message: string, data?: any) => logger.debug(message, data),
  info: (message: string, data?: any) => logger.info(message, data),
  success: (message: string, data?: any) => logger.success(message, data),
  loading: (message: string, data?: any) => logger.loading(message, data),
  warning: (message: string, data?: any) => logger.warning(message, data),
  error: (message: string, data?: any, error?: Error) =>
    logger.error(message, data, error),
  critical: (message: string, data?: any, error?: Error) =>
    logger.critical(message, data, error),
  time: (label: string) => logger.time(label),
  timeEnd: (label: string) => logger.timeEnd(label),
  table: (data: any) => logger.table(data),
  group: (label: string) => logger.group(label),
  groupEnd: () => logger.groupEnd(),
  trace: (message: string) => logger.trace(message),
  setContext: (context: string) => logger.setContext(context),
  getLogs: () => logger.getLogs(),
  clearLogs: () => logger.clearLogs(),
  exportLogs: () => logger.exportLogs(),
  configure: (config: Partial<LogConfig>) => logger.configure(config),
};

export const useLogger = (context?: string) => {
  if (context) {
    logger.setContext(context);
  }

  return Log;
};
