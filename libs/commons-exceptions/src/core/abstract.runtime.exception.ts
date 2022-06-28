import { HttpException } from '@nestjs/common';

export abstract class AbstractRuntimeException<
  T extends HttpException,
> extends Error {
  readonly localMessage: string;

  constructor(message = ``) {
    super(message);

    this.localMessage = message;
  }

  abstract toHttpException(): T;
}
