import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Filters, FiltersSchema } from './filters.schema';

export class Image {
  @Prop({ type: FiltersSchema })
  filters: Filters;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
