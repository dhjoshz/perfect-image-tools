import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BusinessLogicCommand } from 'libs/commons/src';
import { Model } from 'mongoose';
import { catchError, from, Observable } from 'rxjs';
import { Effect } from 'src/models/effect.model';
import { EffectDocument } from 'src/schemas/effect.schema';

@Injectable()
export class FindEffectsCommand
  implements BusinessLogicCommand<Observable<EffectDocument>>
{
  private readonly logger = new Logger(FindEffectsCommand.name);

  constructor(
    @InjectModel(Effect.name)
    private imageModel: Model<EffectDocument>,
  ) {}

  execute(): Observable<EffectDocument[] | any> {
    return from(this.imageModel.find()).pipe(
      catchError((err) => {
        this.logger.error(`Error getting effects: ${err.message}`);
        throw new InternalServerErrorException(
          err.message,
          `Error getting effects`,
        );
      }),
    );
  }
}
