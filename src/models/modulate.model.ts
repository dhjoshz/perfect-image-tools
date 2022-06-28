import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';

export class Modulate {
  @ApiProperty({
    type: Number,
    default: 1,
    minimum: 0,
    maximum: 5,
    required: false,
  })
  @IsOptional()
  @IsNumber(
    {
      allowNaN: false,
    },
    {
      message: 'Invalid brightness value',
    },
  )
  @Min(0, {
    message: 'brightness value cannot be lower than 0',
  })
  @Max(5, {
    message: 'brightness value cannot be higher than 5',
  })
  brightness?: number;

  @ApiProperty({
    type: Number,
    default: 1,
    minimum: 0,
    maximum: 10,
    required: false,
  })
  @IsOptional()
  @IsNumber(
    {
      allowNaN: false,
    },
    {
      message: 'Invalid saturation value',
    },
  )
  @Min(0, {
    message: 'saturation value cannot be lower than 0',
  })
  @Max(10, {
    message: 'saturation value cannot be higher than 10',
  })
  saturation?: number;

  @ApiProperty({
    type: Number,
    default: 0,
    minimum: 0,
    maximum: 360,
    required: false,
  })
  @IsOptional()
  @IsNumber(
    {
      allowNaN: false,
    },
    {
      message: 'Invalid hue value',
    },
  )
  @Min(0, {
    message: 'hue value cannot be lower than 0',
  })
  @Max(360, {
    message: 'hue value cannot be higher than 360',
  })
  hue?: number;

  @ApiProperty({
    type: Number,
    default: 0,
    minimum: -100,
    maximum: 100,
    required: false,
  })
  @IsOptional()
  @IsNumber(
    {
      allowNaN: false,
    },
    {
      message: 'Invalid lightness value',
    },
  )
  @Min(-100, {
    message: 'lightness value cannot be lower than -100',
  })
  @Max(100, {
    message: 'lightness value cannot be higher than 100',
  })
  lightness?: number;
}
