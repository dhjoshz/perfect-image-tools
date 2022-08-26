import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Max,
  Min,
  MinLength,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { Matrix3x3 } from 'sharp';
import { Clahe } from './clahe.model';
import { Modulate } from './modulate.model';
import { Sharpen } from './sharpen.model';
import { Threshold } from './threshold.model';

export class Filters {
  @ApiProperty({
    type: Number,
    default: 0,
    minimum: 0,
    maximum: 100,
    required: false,
  })
  @IsOptional()
  @IsInt({
    message: 'Invalid median value, an integer value is expected',
  })
  @Min(0, {
    message: 'Median value cannot be lower than 0',
  })
  @Max(100, {
    message: 'Median value cannot be higher than 100',
  })
  median?: number;

  @ApiProperty({
    type: Number,
    default: 0.3,
    minimum: 0.3,
    maximum: 100,
    required: false,
  })
  @IsOptional()
  @IsNumber(
    {},
    {
      message: 'Invalid blur value, a numeric value is expected',
    },
  )
  @Min(0.3, {
    message: 'Blur value cannot be lower than 0.3',
  })
  @Max(100, {
    message: 'Blur value cannot be higher than 100',
  })
  blur?: number;

  @ApiProperty({
    type: Number,
    default: 2.2,
    minimum: 1.0,
    maximum: 3.0,
    required: false,
  })
  @IsOptional()
  @IsNumber(
    {},
    {
      message: 'Inavlid gamma value, a numeric value is expected',
    },
  )
  @Min(1.0, {
    message: 'Gamma value cannot be lower than 1.0',
  })
  @Max(3.0, {
    message: 'Gamma value cannot be higher than 3.0',
  })
  gamma?: number;

  @ApiProperty({
    type: String,
    minLength: 7,
    maxLength: 7,
    required: false,
    default: '#00FFFF',
  })
  @ValidateIf((o) => o.tint && o.tint.length > 0)
  @IsOptional()
  @IsString({
    message: 'Invalid tint color, a string value is expected',
  })
  @MinLength(7, {
    message: 'The tint color must be at least 7 characters long',
  })
  @Matches(/^#(?:[0-9a-fA-F]{3,4}){1,2}$/, {
    message: 'Invalid tint color code, a hex color code is expected',
  })
  tint?: string;

  @ApiProperty({
    type: String,
    minLength: 3,
    required: false,
    default: '#00FFFF',
  })
  @ValidateIf((o) => o.transparencyColor && o.transparencyColor.length > 0)
  @IsOptional()
  @IsString({
    message: 'Invalid transparency color, a string value is expected',
  })
  @MinLength(3, {
    message: 'The transparency color must be at least 7 characters long',
  })
  transparencyColor?: string;

  @ApiProperty({
    type: Array,
    required: false,
  })
  @IsOptional()
  recomb?: Matrix3x3;

  @ApiProperty({
    type: Boolean,
    default: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean({
    message: 'Invalid normalise value, a boolean value is expected',
  })
  normalise?: boolean;

  @ApiProperty({
    type: Boolean,
    default: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean({
    message: 'Invalid grayscale value, a boolean value is expected',
  })
  grayscale?: boolean;

  @ApiProperty({
    type: Boolean,
    default: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean({
    message: 'Invalid negate value, a boolean value is expected',
  })
  negate?: boolean;

  @ApiProperty({
    type: Clahe,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  clahe?: Clahe;

  @ApiProperty({
    type: Threshold,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  threshold?: Threshold;

  @ApiProperty({
    type: Modulate,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  modulate?: Modulate;

  @ApiProperty({
    type: Sharpen,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  sharpen?: Sharpen;
}
