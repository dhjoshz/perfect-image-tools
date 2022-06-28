import { Inject, Injectable } from '@nestjs/common';
import { BusinessLogicCommand } from 'libs/commons/src';
import { from, Observable, of } from 'rxjs';
import { Image } from '../../../models/image.model';
import { ApplyFiltersCommand } from './applyFilters.cmd';

@Injectable()
export class ProcessImageCommand
  implements BusinessLogicCommand<Buffer, Express.Multer.File, Image>
{
  @Inject()
  private readonly applyFiltersCommand: ApplyFiltersCommand;

  execute(
    image: Express.Multer.File,
    imageProperties: Image,
  ): Observable<Buffer> {
    let imageBuffer$ = of(image.buffer);
    if (imageProperties.filters) {
      imageBuffer$ = this.applyFiltersCommand.execute(
        imageBuffer$,
        imageProperties.filters,
      );
    }
    return from(imageBuffer$);
  }
}
