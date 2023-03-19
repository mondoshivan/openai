import { ILogObj, Logger } from "tslog";

/**
 * enum of the available log levels.
 */
export enum LogLevel {
  SILLY = 0,
  TRACE = 1,
  DEBUG = 2,
  INFO = 3,
  WARN = 4,
  ERROR = 5,
  FATAL = 6
}

/**
 * CLRWLogger extends the tslog Logger with some convenient methods.
 */
export class CLRWLogger<T> extends Logger<T> {

  /**
   * Converts the log level from string to number.
   * The default value level is debug.
   * 
   * @param level LogLevelStr: 'debug' | 'info' | 'warn' | 'error' | 'fatal'
   * @returns LogLevel as number
   */
  static logLevelStr2Enum(level: LogLevelStr): LogLevel {
    if (level.toLowerCase() === 'silly') return LogLevel.SILLY;
    if (level.toLowerCase() === 'trace') return LogLevel.TRACE;
    if (level.toLowerCase() === 'debug') return LogLevel.DEBUG;
    if (level.toLowerCase() === 'info') return LogLevel.INFO;
    if (level.toLowerCase() === 'warn') return LogLevel.WARN;
    if (level.toLowerCase() === 'error') return LogLevel.ERROR;
    if (level.toLowerCase() === 'fatal') return LogLevel.FATAL;

    return LogLevel.DEBUG;
  }

  /**
   * Is the log level debug?
   * @returns true if log level is debug and false otherwise;
   */
  public isDebug(): boolean {
    return this.settings.minLevel === LogLevel.DEBUG;
  }
}

/**
 * Available log level as string representation.
 */
type LogLevelStr = 'silly' | 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';

let logLevel = LogLevel.DEBUG;
if (process.env['LOG_LEVEL'] && ['silly', 'trace', 'debug', 'info', 'warn', 'error', 'fatal'].includes(process.env['LOG_LEVEL'])) {
  logLevel = CLRWLogger.logLevelStr2Enum(process.env['LOG_LEVEL'] as LogLevelStr);
} else if (process.env['NODE_ENV'] === "production") {
  logLevel = LogLevel.WARN;
} else if (process.env['NODE_ENV'] === "test") {
  logLevel = LogLevel.ERROR;
}

const log: CLRWLogger<ILogObj> = new CLRWLogger({
  prettyLogTemplate: "{{yyyy}}-{{mm}}-{{dd}}T{{hh}}:{{MM}}:{{ss}}.{{ms}}Z {{logLevelName}}\t[{{filePathWithLine}}{{name}}] ",
  prettyLogTimeZone: 'local',
  minLevel: logLevel
});

export default log;