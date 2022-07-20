import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, Max, Min } from 'class-validator';

export class Threshold {
  @ApiProperty({
    type: Number,
    default: 0,
    minimum: 0,
    maximum: 255,
    required: false,
  })
  @IsOptional()
  @IsNumber(
    {
      allowNaN: false,
    },
    {
      message: 'Invalid treshhold value',
    },
  )
  @Min(0, {
    message: 'treshhold value cannot be lower than 0',
  })
  @Max(255, {
    message: 'treshhold value cannot be higher than 255',
  })
  threshold?: number;

  @ApiProperty({
    type: Boolean,
    default: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean({
    message: 'Invalid Threshold-grayscale value, a boolean value is expected',
  })
  grayscale?: boolean;
}
