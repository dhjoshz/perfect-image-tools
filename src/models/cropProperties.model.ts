import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class CropProperties {
  @ApiProperty({
    type: Number,
    required: true,
    description: 'distance in pixels from the left side',
  })
  @IsNotEmpty({
    message: 'Crop left value cannot be empty',
  })
  @IsInt({
    message: 'Invalid crop left value, an integer value is expected',
  })
  @Min(0, {
    message: 'Crop left value cannot be lower than 0',
  })
  left: number;

  @ApiProperty({
    type: Number,
    required: true,
    description: 'distance in pixels from the top side',
  })
  @IsNotEmpty({
    message: 'Crop top value cannot be empty',
  })
  @IsInt({
    message: 'Invalid crop top value, an integer value is expected',
  })
  @Min(0, {
    message: 'Crop top value cannot be lower than 0',
  })
  top: number;

  @ApiProperty({
    type: Number,
    required: true,
    description: 'new width for the image',
  })
  @IsNotEmpty({
    message: 'Crop width value cannot be empty',
  })
  @IsInt({
    message: 'Invalid crop width value, an integer value is expected',
  })
  @Min(0, {
    message: 'Crop width value cannot be lower than 0',
  })
  width: number;

  @ApiProperty({
    type: Number,
    required: true,
    description: 'new height for the image',
  })
  @IsNotEmpty({
    message: 'Crop height value cannot be empty',
  })
  @IsInt({
    message: 'Invalid crop height value, an integer value is expected',
  })
  @Min(0, {
    message: 'Crop height value cannot be lower than 0',
  })
  height: number;
}
