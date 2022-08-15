import { Inject, Injectable } from '@nestjs/common';
import { BusinessLogicCommand } from '@app/commons';
import { AppLogger } from '@logger';
import { from, Observable, of } from 'rxjs';
import { Image } from '@models';
import { ApplyCropCommand } from './applyCrop.cmd';
import { ApplyFiltersCommand } from './applyFilters.cmd';
import { ApplyRotationCommand } from './applyRotation.cmd';
import { ApplyResizeCommand } from './applyResize.cmd';

@Injectable()
export class ProcessImageCommand
  implements BusinessLogicCommand<Buffer, Express.Multer.File, Image>
{
  private readonly logger = AppLogger.getInstance(ApplyFiltersCommand.name);

  @Inject()
  private readonly applyFiltersCommand: ApplyFiltersCommand;

  @Inject()
  private readonly applyCropCommand: ApplyCropCommand;

  @Inject()
  private readonly applyRotationCommand: ApplyRotationCommand;

  @Inject()
  private readonly applyResizeCommand: ApplyResizeCommand;

  execute(
    image: Express.Multer.File,
    imageProperties: Image,
  ): Observable<Buffer> {
    this.logger.debug(`${image.originalname} processing start`, true);
    let imageBuffer$ = of(image.buffer);
    if (imageProperties.filters) {
      imageBuffer$ = this.applyFiltersCommand.execute(
        imageBuffer$,
        imageProperties.filters,
      );
    }
    if (imageProperties.cropProperties) {
      imageBuffer$ = this.applyCropCommand.execute(
        imageBuffer$,
        imageProperties.cropProperties,
      );
    }
    if (imageProperties.rotationProperties) {
      imageBuffer$ = this.applyRotationCommand.execute(
        imageBuffer$,
        imageProperties.rotationProperties,
      );
    }
    if (imageProperties.resizeProperties) {
      imageBuffer$ = this.applyResizeCommand.execute(
        imageBuffer$,
        imageProperties.resizeProperties,
      );
    }
    this.logger.debug(`${image.originalname} processing complete`, true);
    return from(imageBuffer$);
  }
}
