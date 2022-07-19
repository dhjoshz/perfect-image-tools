import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Image } from './image.schema';

export type EffectDocument = Effect & Document;

@Schema({
  timestamps: true,
})
export class Effect {
  @Prop({
    unique: true,
  })
  name: string;

  @Prop({ type: Image })
  imageProperties: Image;
}

export const EffectSchema = SchemaFactory.createForClass(Effect);
