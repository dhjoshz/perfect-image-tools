import {
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BusinessLogicCommand } from 'libs/commons/src';
import { Model } from 'mongoose';
import { catchError, from, map, Observable } from 'rxjs';
import { EffectInternalServerErrorException } from 'src/exception/effect/effect.internal.server.error.exception';
import { EffectNotFoundException } from 'src/exception/effect/effect.not.found.exception';
import { Effect } from 'src/models/effect.model';
import { EffectDocument } from 'src/schemas/effect.schema';

@Injectable()
export class FindEffectByIdCommand
  implements BusinessLogicCommand<string, string, Observable<EffectDocument>>
{
  private readonly logger = new Logger(FindEffectByIdCommand.name);

  constructor(
    @InjectModel(Effect.name)
    private imageModel: Model<EffectDocument>,
  ) {}

  execute(effectId: string): Observable<EffectDocument | any> {
    return from(this.imageModel.findById(effectId)).pipe(
      catchError((err) => {
        this.logger.error(`Error getting effect by id: ${err.message}`);
        throw new EffectInternalServerErrorException(
          `Error getting effect, ${err.message}`,
        );
      }),
      map((effect) => {
        if (!effect) {
          this.logger.warn(`Effect: ${effectId}, not found`);
          throw new EffectNotFoundException(`Effect ${effectId}, not found`);
        }
        return effect;
      }),
    );
  }
}
