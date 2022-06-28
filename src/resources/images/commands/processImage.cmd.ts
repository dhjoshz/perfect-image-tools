import { Inject, Injectable } from '@nestjs/common';
import { BusinessLogicCommand } from 'libs/commons/src';
import { AppLogger } from 'libs/commons/src/logger';
import { from, Observable, of } from 'rxjs';
import { Image } from '../../../models/image.model';
import { ApplyFiltersCommand } from './applyFilters.cmd';

@Injectable()
export class ProcessImageCommand
  implements BusinessLogicCommand<Buffer, Express.Multer.File, Image>
{
  private readonly logger = AppLogger.getInstance(ApplyFiltersCommand.name);

  @Inject()
  private readonly applyFiltersCommand: ApplyFiltersCommand;

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
    this.logger.debug(`${image.originalname} processing complete`, true);
    return from(imageBuffer$);
  }
}
