import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Matches,
  Max,
  Min,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class RotationProperties {
  @ApiProperty({
    type: Number,
    default: 0,
    minimum: 0,
    maximum: 360,
    required: false,
  })
  @IsOptional()
  @IsInt({
    message: 'Invalid rotation angle value, an integer value is expected',
  })
  @Min(0, {
    message: 'Rotation angle value cannot be lower than 0',
  })
  @Max(360, {
    message: 'Rotation angle value cannot be higher than 360',
  })
  angle: number;

  @ApiProperty({
    type: String,
    minLength: 7,
    maxLength: 7,
    required: false,
    default: '',
  })
  @ValidateIf((o) => o.transparencyColor && o.transparencyColor.length > 0)
  @IsOptional()
  @IsString({
    message: 'Invalid transparency color, a string value is expected',
  })
  @MinLength(7, {
    message: 'The transparency color must be at least 7 characters long',
  })
  @Matches(/^#(?:[0-9a-fA-F]{3,4}){1,2}$/, {
    message: 'Invalid transparency color code, a hex color code is expected',
  })
  transparencyColor: string;

  @ApiProperty({
    type: Boolean,
    default: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean({
    message: 'Invalid horizontalFlip value, a boolean value is expected',
  })
  horizontalFlip: boolean;

  @ApiProperty({
    type: Boolean,
    default: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean({
    message: 'Invalid verticalFlip value, a boolean value is expected',
  })
  verticalFlip: boolean;
}
