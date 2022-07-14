import { Injectable } from '@nestjs/common';
import { BusinessLogicCommand } from 'libs/commons/src';
import { AppLogger } from 'libs/commons/src/logger';
import { catchError, from, Observable, switchMap, throwError } from 'rxjs';
import * as sharp from 'sharp';
import { ImageFiltersBadRequestException } from 'src/exception/image-filters/image-filters.bad.requestexception';
import { CropProperties } from 'src/models/cropProperties.model';

@Injectable()
export class ApplyCropCommand
  implements BusinessLogicCommand<Buffer, Observable<Buffer>, CropProperties>
{
  private readonly logger = AppLogger.getInstance(ApplyCropCommand.name);
  private imageProcessor = sharp;

  private errorHandler = (error) => {
    const handledError = error;
    return throwError(() => handledError);
  };

  constructor() {
    this.imageProcessor.cache(false);
  }

  execute(
    imageBuffer$: Observable<Buffer>,
    cropData: CropProperties,
  ): Observable<Buffer> {
    return imageBuffer$.pipe(
      switchMap((imgBuffer) => {
        return from(
          this.imageProcessor(imgBuffer).extract(cropData).toBuffer(),
        );
      }),
      catchError((error) => {
        this.logger.error(`Error applying crop: ${error}`);
        return this.errorHandler(new ImageFiltersBadRequestException(error));
      }),
    );
  }
}
