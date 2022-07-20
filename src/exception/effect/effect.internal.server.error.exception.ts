import { HttpStatus } from "@nestjs/common";
import { AbstractImageException } from "@app/commons-exceptions";

export class EffectInternalServerErrorException extends AbstractImageException {
  public static STATUS_CODE = HttpStatus.INTERNAL_SERVER_ERROR;

  public static ERROR_CODE = 'INTERNAL_SERVER_ERROR';
  constructor(message: string) {
    super(`EffectInternalServerErrorException: ${message}`);
  }

  protected getErrorCode(): string {
    return EffectInternalServerErrorException.ERROR_CODE;
  }

  protected getStatusCode(): number {
    return EffectInternalServerErrorException.STATUS_CODE;
  }
}