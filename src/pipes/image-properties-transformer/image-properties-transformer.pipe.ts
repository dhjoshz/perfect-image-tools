import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import {
  Clahe,
  CropProperties,
  Filters,
  Image,
  Modulate,
  RotationProperties,
  Sharpen,
  Threshold,
} from '@models';
import { ResizeProperties } from 'src/models/image/resize.properties';

@Injectable()
export class ImagePropertiesTransformerPipe implements PipeTransform {
  transform(value: { properties?: string }, metadata: ArgumentMetadata) {
    if (value && value.properties) {
      let imageProperties: Image = JSON.parse(value.properties);

      let { 
        filters, 
        rotationProperties, 
        cropProperties, 
        resizeProperties 
      } = imageProperties;

      if (filters) {
        filters = plainToClass(Filters, {
          ...filters,
          clahe: plainToClass(Clahe, filters.clahe),
          threshold: plainToClass(Threshold, filters.threshold),
          modulate: plainToClass(Modulate, filters.modulate),
          sharpen: plainToClass(Sharpen, filters.sharpen),
        });

        imageProperties = {
          ...imageProperties,
          ...plainToClass(Image, {
            filters,
          }),
        };
      }
      if (rotationProperties) {
        rotationProperties = plainToClass(
          RotationProperties,
          rotationProperties,
        );
        imageProperties = {
          ...imageProperties,
          ...plainToClass(Image, {
            rotationProperties,
          }),
        };
      }
      if (cropProperties) {
        cropProperties = plainToClass(CropProperties, cropProperties);
        imageProperties = {
          ...imageProperties,
          ...plainToClass(Image, {
            cropProperties,
          }),
        };
      }
      if (resizeProperties) {
        resizeProperties = plainToClass(ResizeProperties, resizeProperties);
        imageProperties = {
          ...imageProperties,
          ...plainToClass(Image, {
            resizeProperties,
          }),
        };
      }

      imageProperties = plainToClass(Image, imageProperties);

      return imageProperties;
    }
    return value;
  }
}
