import { Injectable } from '@nestjs/common';
import { BusinessLogicCommand } from '@app/commons';
import { AppLogger } from '@logger';
import { catchError, from, Observable, switchMap, throwError } from 'rxjs';
import * as sharp from 'sharp';
import { ImageFiltersBadRequestException } from '@exceptions';
import { RotationProperties } from '@models';

@Injectable()
export class ApplyRotationCommand
  implements
    BusinessLogicCommand<Buffer, Observable<Buffer>, RotationProperties>
{
  private readonly logger = AppLogger.getInstance(ApplyRotationCommand.name);
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
    rotationProperties: RotationProperties,
  ): Observable<Buffer> {
    return imageBuffer$.pipe(
      switchMap((imageBuffer) => {
        let imageRotated = this.imageProcessor(imageBuffer);
        if (rotationProperties.angle) {
          imageRotated = imageRotated.png();
          imageRotated = imageRotated.rotate(rotationProperties.angle, {
            background: rotationProperties.transparencyColor
              ? rotationProperties.transparencyColor
              : {
                  r: 0,
                  b: 0,
                  g: 0,
                  alpha: 0,
                },
          });
        }
        if (rotationProperties.horizontalFlip) {
          imageRotated = imageRotated.flop();
        }
        if (rotationProperties.verticalFlip) {
          imageRotated = imageRotated.flip();
        }
        return from(imageRotated.toBuffer());
      }),
      catchError((error) => {
        this.logger.error(`Error applying rotation: ${error}`);
        return this.errorHandler(new ImageFiltersBadRequestException(error));
      }),
    );
  }
}
