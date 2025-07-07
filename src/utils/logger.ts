/**
 * Enhanced logging utility for React Native applications
 * Provides structured logging with different levels and error tracking
 */

export type TLogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface ILogEntry {
  level: TLogLevel;
  message: string;
  timestamp: string;
  context?: Record<string, unknown>;
  error?: Error;
  userId?: string;
  sessionId?: string;
}

class Logger {
  private isDevelopment = __DEV__;
  private logEntries: ILogEntry[] = [];
  private maxLogEntries = 1000;

  /**
   * Log a debug message (only in development)
   */
  debug(message: string, context?: Record<string, unknown>): void {
    if (this.isDevelopment) {
      this.log('debug', message, context);
    }
  }

  /**
   * Log an info message
   */
  info(message: string, context?: Record<string, unknown>): void {
    this.log('info', message, context);
  }

  /**
   * Log a warning message
   */
  warn(message: string, context?: Record<string, unknown>): void {
    this.log('warn', message, context);
  }

  /**
   * Log an error message
   */
  error(
    message: string,
    error?: Error,
    context?: Record<string, unknown>
  ): void {
    this.log('error', message, context, error);
  }

  /**
   * Core logging method
   */
  private log(
    level: TLogLevel,
    message: string,
    context?: Record<string, unknown>,
    error?: Error
  ): void {
    const logEntry: ILogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      ...(context && { context }),
      ...(error && { error }),
    };

    // Add to in-memory log storage
    this.addLogEntry(logEntry);

    // Console output
    this.outputToConsole(logEntry);

    // Send to crash reporting service in production
    if (!this.isDevelopment && (level === 'error' || level === 'warn')) {
      this.sendToCrashlytics(logEntry);
    }
  }

  /**
   * Add log entry to in-memory storage
   */
  private addLogEntry(logEntry: ILogEntry): void {
    this.logEntries.push(logEntry);

    // Keep only the latest entries to prevent memory leaks
    if (this.logEntries.length > this.maxLogEntries) {
      this.logEntries = this.logEntries.slice(-this.maxLogEntries);
    }
  }

  /**
   * Output formatted log to console
   */
  private outputToConsole(logEntry: ILogEntry): void {
    const { level, message, timestamp, context, error } = logEntry;
    const prefix = `[${timestamp}] [${level.toUpperCase()}]`;

    switch (level) {
      case 'debug':
        console.log(`${prefix} ${message}`, context || '');
        break;
      case 'info':
        console.info(`${prefix} ${message}`, context || '');
        break;
      case 'warn':
        console.warn(`${prefix} ${message}`, context || '');
        if (error) console.warn(error);
        break;
      case 'error':
        console.error(`${prefix} ${message}`, context || '');
        if (error) console.error(error);
        break;
    }
  }

  /**
   * Send error logs to crash reporting service
   */
  private sendToCrashlytics(logEntry: ILogEntry): void {
    // In a real app, integrate with Firebase Crashlytics, Sentry, or similar
    // Example: Crashlytics().recordError(logEntry.error || new Error(logEntry.message));

    // For now, we'll store it for potential upload
    this.debug('Would send to crashlytics:', {
      level: logEntry.level,
      message: logEntry.message,
      hasError: !!logEntry.error,
    });
  }

  /**
   * Get recent log entries (useful for debugging)
   */
  getRecentLogs(count = 50): ILogEntry[] {
    return this.logEntries.slice(-count);
  }

  /**
   * Clear all log entries
   */
  clearLogs(): void {
    this.logEntries = [];
    this.info('Log entries cleared');
  }

  /**
   * Log app lifecycle events
   */
  logAppEvent(event: string, data?: Record<string, unknown>): void {
    this.info(`App Event: ${event}`, data);
  }

  /**
   * Log user interactions
   */
  logUserAction(
    action: string,
    screen?: string,
    data?: Record<string, unknown>
  ): void {
    this.info(`User Action: ${action}`, {
      screen,
      ...data,
    });
  }

  /**
   * Log API calls
   */
  logApiCall(
    method: string,
    url: string,
    status?: number,
    duration?: number
  ): void {
    const level = status && status >= 400 ? 'error' : 'info';
    this.log(level, `API Call: ${method} ${url}`, {
      status,
      duration,
    });
  }

  /**
   * Log performance metrics
   */
  logPerformance(metric: string, value: number, unit = 'ms'): void {
    this.info(`Performance: ${metric}`, {
      value,
      unit,
    });
  }
}

// Create and export singleton instance
export const logger = new Logger();

// Export convenience functions
export const logDebug = logger.debug.bind(logger);
export const logInfo = logger.info.bind(logger);
export const logWarn = logger.warn.bind(logger);
export const logError = logger.error.bind(logger);
export const logAppEvent = logger.logAppEvent.bind(logger);
export const logUserAction = logger.logUserAction.bind(logger);
export const logApiCall = logger.logApiCall.bind(logger);
export const logPerformance = logger.logPerformance.bind(logger);

export default logger;
