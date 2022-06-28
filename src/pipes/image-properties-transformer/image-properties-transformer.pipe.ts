import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Clahe } from 'src/models/clahe.model';
import { Filters } from 'src/models/filters.model';
import { Image } from 'src/models/image.model';
import { Modulate } from 'src/models/modulate.model';
import { Sharpen } from 'src/models/sharpen.model';
import { Threshold } from 'src/models/threshold.model';

@Injectable()
export class ImagePropertiesTransformerPipe implements PipeTransform {
  transform(value: { properties?: string }, metadata: ArgumentMetadata) {
    if (value && value.properties) {
      let imageProperties = JSON.parse(value.properties);
      let { filters } = imageProperties;
      if (filters) {
        filters = plainToClass(Filters, {
          ...filters,
          clahe: plainToClass(Clahe, filters.clahe),
          threshold: plainToClass(Threshold, filters.threshold),
          modulate: plainToClass(Modulate, filters.modulate),
          sharpen: plainToClass(Sharpen, filters.sharpen),
        });
        imageProperties = plainToClass(Image, { filters: filters });
      }
      return imageProperties;
    }
    return value;
  }
}
