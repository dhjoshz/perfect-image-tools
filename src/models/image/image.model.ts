import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDefined, IsOptional, ValidateNested } from 'class-validator';
import { CropProperties } from './cropProperties.model';
import { Filters } from './filters.model';
import { ResizeProperties } from './resize.properties';
import { RotationProperties } from './rotationProperties.model';

export class Image {
  @ApiProperty({
    type: Filters,
    required: false,
    description: 'Filters to be applied over the image',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => Filters)
  @IsDefined()
  filters?: Filters;

  @ApiProperty({
    type: CropProperties,
    required: false,
    description: 'Crop properties to be applied over the image',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => CropProperties)
  @IsDefined()
  cropProperties?: CropProperties;

  @ApiProperty({
    type: ResizeProperties,
    required: false,
    description: 'Resize properties to be applied over the image',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ResizeProperties)
  @IsDefined()
  resizeProperties?: ResizeProperties;

  @ApiProperty({
    type: RotationProperties,
    required: false,
    description: 'Rotation properties to be applied over the image',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => RotationProperties)
  @IsDefined()
  rotationProperties?: RotationProperties;
}
