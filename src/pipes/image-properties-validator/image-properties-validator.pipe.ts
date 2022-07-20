import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { validateOrReject, ValidationError } from 'class-validator';
import { AppLogger } from '@logger';

@Injectable()
export class ImagePropertiesValidatorPipe implements PipeTransform {
  private readonly logger = AppLogger.getInstance(
    ImagePropertiesValidatorPipe.name,
  );

  async transform(value: any, metadata: ArgumentMetadata) {
    if (value?.filters || value?.cropData) {
      try {
        await validateOrReject(value);
      } catch (errors) {
        errors = this.formatErrorMessage(errors);
        this.logger.error(
          `Errors found validating image properties: ${errors}`,
        );
        throw new BadRequestException(errors);
      }
    }
    return value;
  }

  private formatErrorMessage(errors: ValidationError[]) {
    return errors
      .map((error: ValidationError) => {
        if (error.constraints) {
          return Object.values(error.constraints);
        }
        if (error.children.length > 0) {
          return this.formatErrorMessage(error.children);
        }
        return error;
      })
      .flat();
  }
}
