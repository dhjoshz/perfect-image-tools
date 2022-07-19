import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDefined,
  IsNotEmpty,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Image } from './image.model';

export class Effect {
  @ApiProperty({
    type: String,
    default: 'Effect name',
    minLength: 1,
    required: true,
  })
  @IsNotEmpty({
    message: 'Effect name couldnt be empty',
  })
  @IsString({
    message: 'Invalid effect name, a string value is expected',
  })
  @MinLength(7, {
    message: 'The effect name must be at least 1 characters long',
  })
  name: string;

  @ApiProperty({
    type: Image,
    required: false,
    description: 'Filters to be applied over the image',
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Image)
  @IsDefined()
  imageProperties: Image;
}
