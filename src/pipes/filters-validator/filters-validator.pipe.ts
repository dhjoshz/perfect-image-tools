import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { validateOrReject, ValidationError } from 'class-validator';
import { AppLogger } from 'libs/commons/src/logger';

@Injectable()
export class FiltersValidatorPipe implements PipeTransform {
  private readonly logger = AppLogger.getInstance(FiltersValidatorPipe.name);

  async transform(value: any, metadata: ArgumentMetadata) {
    if (value && value.filters) {
      const { filters } = value;
      try {
        await validateOrReject(filters);
      } catch (errors) {
        errors = this.formatErrorMessage(errors);
        this.logger.error(
          `Errors found in the image properties schema: ${errors}`,
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
