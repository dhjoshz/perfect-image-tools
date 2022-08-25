import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Image } from '../image/image.model';

export class Effect {
  @ApiProperty({
    type: String,
    default: 'Effect name',
    minLength: 3,
    required: true,
  })
  @IsNotEmpty({
    message: 'Effect name couldnt be empty',
  })
  @IsString({
    message: 'Invalid effect name, a string value is expected',
  })
  @MinLength(3, {
    message: 'The effect name must be at least 3 characters long',
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

  // as we don't have the user module yet,
  // we need to make sure that some effects cannot be deleted
  @ApiProperty({
    type: Boolean,
    required: false,
    description: 'flag to avoid delete this effect',
  })
  @IsOptional()
  @IsBoolean({
    message: 'Invalid removable flag, a boolean value is expected',
  })
  isRemovable: boolean;
}
