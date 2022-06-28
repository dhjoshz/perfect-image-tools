import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, Max, Min } from 'class-validator';

export class Clahe {
  @ApiProperty({
    type: Number,
    default: 100,
    minimum: 1,
    maximum: 100,
    required: true,
  })
  @IsNotEmpty({
    message: 'Clahe-width is required, an integer value is expected',
  })
  @IsNumber(
    {
      allowNaN: false,
    },
    {
      message: 'Invalid Clahe-width value',
    },
  )
  @Min(1, {
    message: 'Clahe-width value cannot be lower than 1',
  })
  @Max(100, {
    message: 'Clahe-width value cannot be higher than 100',
  })
  width: number;

  @ApiProperty({
    type: Number,
    default: 100,
    minimum: 1,
    maximum: 100,
    required: true,
  })
  @IsNotEmpty({
    message: 'Clahe-height is required',
  })
  @IsNumber(
    {
      allowNaN: false,
    },
    {
      message: 'Invalid Clahe-height value, an integer value is expected',
    },
  )
  @Min(0, {
    message: 'Clahe-height value cannot be lower than 0',
  })
  @Max(100, {
    message: 'Clahe-height value cannot be higher than 100',
  })
  height: number;

  @ApiProperty({
    type: Number,
    default: 3,
    minimum: 0,
    maximum: 100,
    required: false,
  })
  @IsOptional()
  @IsNumber(
    {
      allowNaN: false,
    },
    {
      message: 'Invalid Clahe-maxSlope value, an integer value is expected',
    },
  )
  @Min(0, {
    message: 'Clahe-maxSlope value cannot be lower than 0',
  })
  @Max(100, {
    message: 'Clahe-maxSlope value cannot be higher than 100',
  })
  maxSlope?: number;
}
