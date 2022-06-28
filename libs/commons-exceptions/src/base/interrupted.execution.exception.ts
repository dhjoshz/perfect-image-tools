import { InternalServerErrorException } from '@nestjs/common';
import { AbstractRuntimeException } from '../core';

export class InterruptedExecutionException extends AbstractRuntimeException<InternalServerErrorException> {
  toHttpException(): InternalServerErrorException {
    return new InternalServerErrorException(
      `InterruptedExecutionException: ${this.localMessage}`,
    );
  }
}
