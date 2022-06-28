import { HttpStatus } from '@nestjs/common';
import { AbstractImageException } from 'libs/commons-exceptions/src/core/abstract.image.exception';

export class ImageBadRequestException extends AbstractImageException {
  public static STATUS_CODE = HttpStatus.BAD_REQUEST;

  public static ERROR_CODE = `IMAGE_BAD_REQUEST`;

  constructor(message: string) {
    super(`ImageBadRequestException: ${message}`);
  }

  protected getErrorCode(): string {
    return ImageBadRequestException.ERROR_CODE;
  }

  protected getStatusCode(): number {
    return ImageBadRequestException.STATUS_CODE;
  }
}
