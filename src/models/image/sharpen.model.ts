import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';

export class Sharpen {
  @ApiProperty({
    type: Number,
    default: 0.1,
    minimum: 0.01,
    maximum: 100,
    required: false,
  })
  @IsOptional()
  @IsNumber(
    {
      allowNaN: false,
    },
    {
      message: 'Invalid sigma value',
    },
  )
  @Min(0.01, {
    message: 'sigma value cannot be lower than 0.01',
  })
  @Max(100, {
    message: 'sigma value cannot be higher than 100',
  })
  sigma?: number;

  @ApiProperty({
    type: Number,
    default: 1.0,
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
      message: 'Invalid flat value',
    },
  )
  @Min(0, {
    message: 'flat value cannot be lower than 0',
  })
  @Max(100, {
    message: 'flat value cannot be higher than 100',
  })
  flat?: number;

  @ApiProperty({
    type: Number,
    default: 2.0,
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
      message: 'Invalid jagged value',
    },
  )
  @Min(0, {
    message: 'jagged value cannot be lower than 0',
  })
  @Max(100, {
    message: 'jagged value cannot be higher than 100',
  })
  jagged?: number;
}
