import { Injectable } from '@nestjs/common';
import { BusinessLogicCommand } from '@app/commons';
import { AppLogger } from '@logger';
import { catchError, from, Observable, switchMap, throwError } from 'rxjs';
import * as sharp from 'sharp';
import { ImageFiltersBadRequestException } from '@exceptions';
import { CropProperties } from '@models';

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
