import { Injectable } from '@nestjs/common';
import { BusinessLogicCommand } from 'libs/commons/src';
import { AppLogger } from 'libs/commons/src/logger';
import { catchError, Observable, throwError } from 'rxjs';
import { ImageFiltersBadRequestException } from 'src/exception/image-filters/image-filters.bad.requestexception';
import { Filters } from 'src/models/filters.model';
import { FiltersBuilder } from '../builders/filters.builder';

@Injectable()
export class ApplyFiltersCommand
  implements BusinessLogicCommand<Buffer, Observable<Buffer>, Filters>
{
  private readonly logger = AppLogger.getInstance(ApplyFiltersCommand.name);

  private errorHandler = (error) => {
    const handledError = error;
    return throwError(() => handledError);
  };

  constructor(private readonly filtersBuilder: FiltersBuilder) {}

  execute(
    imageBuffer$: Observable<Buffer>,
    filters: Filters,
  ): Observable<Buffer> {
    if (filters.blur) {
      imageBuffer$ = this.filtersBuilder.setBlur(imageBuffer$, filters.blur);
    }
    if (filters.median) {
      imageBuffer$ = this.filtersBuilder.setMedian(
        imageBuffer$,
        filters.median,
      );
    }
    if (filters.gamma) {
      imageBuffer$ = this.filtersBuilder.setGamma(imageBuffer$, filters.gamma);
    }
    if (filters.normalise) {
      imageBuffer$ = this.filtersBuilder.setNormalise(imageBuffer$);
    }
    if (filters.clahe) {
      imageBuffer$ = this.filtersBuilder.setClahe(imageBuffer$, filters.clahe);
    }
    if (filters.threshold) {
      imageBuffer$ = this.filtersBuilder.setThreshold(
        imageBuffer$,
        filters.threshold,
      );
    }
    if (filters.modulate) {
      imageBuffer$ = this.filtersBuilder.setModulate(
        imageBuffer$,
        filters.modulate,
      );
    }
    if (filters.tint) {
      imageBuffer$ = this.filtersBuilder.setTint(imageBuffer$, filters.tint);
    }
    if (filters.grayscale) {
      imageBuffer$ = this.filtersBuilder.setGrayScale(imageBuffer$);
    }
    if (filters.transparencyColor) {
      imageBuffer$ = this.filtersBuilder.setFlatten(
        imageBuffer$,
        filters.transparencyColor,
      );
    }
    if (filters.negate) {
      imageBuffer$ = this.filtersBuilder.setNegate(imageBuffer$);
    }
    if (filters.sharpen) {
      imageBuffer$ = this.filtersBuilder.setSharpen(
        imageBuffer$,
        filters.sharpen,
      );
    }
    return imageBuffer$.pipe(
      catchError((error) => {
        this.logger.error(`Error applying filters: ${error}`);
        return this.errorHandler(new ImageFiltersBadRequestException(error));
      }),
    );
  }
}
