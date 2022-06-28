import { NotImplementedException } from '@nestjs/common';
import { AbstractRuntimeException } from '../core';

export class UnsupportedOperationException extends AbstractRuntimeException<NotImplementedException> {
  toHttpException(): NotImplementedException {
    return new NotImplementedException(
      `UnsupportedOperationException: ${this.localMessage}`,
    );
  }
}
