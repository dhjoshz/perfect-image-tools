import { Module } from '@nestjs/common';
import { EffectsController } from './effects.controller';
import { ExceptionModule } from 'src/exception/exception.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Effect, EffectSchema } from 'src/schemas/effect.schema';
import { EffectsCommands } from './commands';

@Module({
  imports: [
    ExceptionModule,
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
