import { HttpStatus } from "@nestjs/common";
import { AbstractImageException } from "@app/commons-exceptions";

export class EffectConflictException extends AbstractImageException {
  public static STATUS_CODE = HttpStatus.CONFLICT;

  public static ERROR_CODE = 'EFFECT_CONFLICT';
  constructor(message: string) {
    super(`EffectConflictException: ${message}`);
  }

  protected getErrorCode(): string {
    return EffectConflictException.ERROR_CODE;
  }

  protected getStatusCode(): number {
    return EffectConflictException.STATUS_CODE;
  }
}