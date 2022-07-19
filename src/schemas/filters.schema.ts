import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type FiltersDocument = Filters & Document;

@Schema()
export class Filters {
  @Prop()
  median?: number;

  @Prop()
  blur?: number;

  @Prop()
  gamma?: number;

  @Prop()
  tint?: string;

  @Prop()
  transparencyColor?: string;

  @Prop()
  normalise?: boolean;

  @Prop()
  grayscale?: boolean;

  @Prop()
  negate?: boolean;
}

export const FiltersSchema = SchemaFactory.createForClass(Filters);
