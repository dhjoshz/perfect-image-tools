import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BusinessLogicCommand } from '@app/commons';
import { Model } from 'mongoose';
import { catchError, from, Observable } from 'rxjs';
import { Effect } from '@models';
import { EffectDocument } from '@schemas';

@Injectable()
export class FindEffectsCommand
  implements BusinessLogicCommand<EffectDocument[]>
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
