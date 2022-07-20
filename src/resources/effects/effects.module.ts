import { Module } from '@nestjs/common';
import { EffectsController } from './effects.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Effect, EffectSchema } from '../../schemas/effect.schema';
import { EffectsCommands } from './commands';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Effect.name,
        schema: EffectSchema,
        collection: 'EFFECTS',
      },
    ]),
  ],
  controllers: [EffectsController],
  providers: [...EffectsCommands],
})
export class EffectsModule {}
