import { HttpStatus } from '@nestjs/common';
import { AbstractImageException } from 'libs/commons-exceptions/src/core/abstract.image.exception';

export class EffectNotFoundException extends AbstractImageException {
  public static STATUS_CODE = HttpStatus.NOT_FOUND;

  public static ERROR_CODE = `EFFECT_NOT_FOUND`;

  constructor(message: string) {
    super(`EffectNotFoundException: ${message}`);
  }

  protected getErrorCode(): string {
    return EffectNotFoundException.ERROR_CODE;
  }

  protected getStatusCode(): number {
    return EffectNotFoundException.STATUS_CODE;
  }
}
