import { Logger } from '@nestjs/common';

export class AppLogger {
  private readonly context: string;

  public static getInstance(context: string): AppLogger {
    return new AppLogger(context);
  }

  private constructor(context: string) {
    this.context = context;
  }

  error(msg: any, isTimeDiffEnabled = false): void {
    Logger.error(msg, '', this.context, isTimeDiffEnabled);
  }

  log(msg: any, isTimeDiffEnabled = false): void {
    Logger.log(msg, this.context, isTimeDiffEnabled);
  }

  warn(msg: any, isTimeDiffEnabled = false): void {
    Logger.warn(msg, this.context, isTimeDiffEnabled);
  }

  debug(msg: any, isTimeDiffEnabled = false): void {
    Logger.debug(msg, this.context, isTimeDiffEnabled);
  }

  verbose(msg: any, isTimeDiffEnabled = false): void {
    Logger.verbose(msg, this.context, isTimeDiffEnabled);
  }
}
