import { HttpStatus } from '@nestjs/common';
import { AbstractImageException } from '@app/commons-exceptions/core/abstract.image.exception';

export class ImageFiltersBadRequestException extends AbstractImageException {
  public static STATUS_CODE = HttpStatus.BAD_REQUEST;

  public static ERROR_CODE = `IMAGE_FILTERS_BAD_REQUEST`;

  constructor(message: string) {
    super(`ImageFiltersBadRequestException: ${message}`);
  }

  protected getErrorCode(): string {
    return ImageFiltersBadRequestException.ERROR_CODE;
  }

  protected getStatusCode(): number {
    return ImageFiltersBadRequestException.STATUS_CODE;
  }
}
