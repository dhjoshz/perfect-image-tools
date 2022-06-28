import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  UnsupportedMediaTypeException,
} from '@nestjs/common';

@Injectable()
export class ImageValidatorPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value) {
      throw new UnsupportedMediaTypeException(
        `The image file shouldn't be empty`,
        'IMAGE_TYPE_NOT_SUPPORTED',
      );
    }
    if (value.mimetype && !value.mimetype.includes('image')) {
      throw new UnsupportedMediaTypeException(
        `Invalid image file`,
        'IMAGE_TYPE_NOT_SUPPORTED',
      );
    }
    return value;
  }
}
