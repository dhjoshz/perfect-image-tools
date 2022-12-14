import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, Min } from 'class-validator';

export class ResizeProperties {
  @ApiProperty({
    type: Number,
    required: true,
    description: 'new width for the image',
  })
  @IsOptional()
  @IsInt({
    message: 'Invalid resize width value, an integer value is expected',
  })
  @Min(0, {
    message: 'Resize width value cannot be lower than 0',
  })
  width: number;

  @ApiProperty({
    type: Number,
    required: true,
    description: 'new height for the image',
  })
  @IsOptional()
  @IsInt({
    message: 'Invalid resize height value, an integer value is expected',
  })
  @Min(0, {
    message: 'Resize height value cannot be lower than 0',
  })
  height: number;
}
