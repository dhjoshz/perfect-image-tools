export type ErrorResponse = {
  statusCode: number;
  error: string;
  message: string;
};

export abstract class AbstractImageException extends Error {
  readonly localMessage: string;

  constructor(message = ``) {
    super(message);
    this.localMessage = message;
  }

  get response(): any {
    return {
      statusCode: this.getStatusCode(),
      error: this.getErrorCode(),
      message: this.localMessage,
    } as ErrorResponse;
  }

  protected abstract getStatusCode(): number;

  protected abstract getErrorCode(): string;
}
