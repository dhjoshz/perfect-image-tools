import { Injectable } from '@nestjs/common';
import { BusinessLogicCommand } from '@app/commons';
import { AppLogger } from '@logger';
import { catchError, from, Observable, switchMap, throwError } from 'rxjs';
import * as sharp from 'sharp';
import { ImageFiltersBadRequestException } from '@exceptions';
import { ResizeProperties } from 'src/models/image/resize.properties';

@Injectable()
export class ApplyResizeCommand
  implements BusinessLogicCommand<Buffer, Observable<Buffer>, ResizeProperties>
{
  private readonly logger = AppLogger.getInstance(ApplyResizeCommand.name);
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
    resizeProperties: ResizeProperties,
  ): Observable<Buffer> {
    return imageBuffer$.pipe(
      switchMap((imgBuffer) => {
        return from(
          this.imageProcessor(imgBuffer).resize(resizeProperties).toBuffer(),
        );
      }),
      catchError((error) => {
        this.logger.error(`Error applying resize: ${error}`);
        return this.errorHandler(new ImageFiltersBadRequestException(error));
      }),
    );
  }
}
