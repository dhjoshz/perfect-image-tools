import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BusinessLogicCommand } from '@app/commons';
import { Model } from 'mongoose';
import { catchError, from, map, Observable } from 'rxjs';
import {
  EffectInternalServerErrorException,
  EffectNotFoundException,
} from '@exceptions';
import { Effect } from '@models';
import { EffectDocument } from '@schemas';

@Injectable()
export class FindEffectByIdCommand
  implements BusinessLogicCommand<EffectDocument, string>
{
  private readonly logger = new Logger(FindEffectByIdCommand.name);

  constructor(
    @InjectModel(Effect.name)
    private imageModel: Model<EffectDocument>,
  ) {}

  execute(effectId: string): Observable<EffectDocument> {
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
