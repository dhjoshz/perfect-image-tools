import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BusinessLogicCommand } from '@app/commons';
import { Model } from 'mongoose';
import { catchError, from, Observable, switchMap, tap } from 'rxjs';
import { EffectInternalServerErrorException } from '@exceptions';
import { Effect } from '@models';
import { EffectDocument } from '@schemas';
import { FindEffectByIdCommand } from './findEffecById.cmd';

@Injectable()
export class DeleteEffectCommand
  implements BusinessLogicCommand<Observable<EffectDocument>, string>
{
  private readonly logger = new Logger(DeleteEffectCommand.name);

  @Inject()
  private readonly findEffectByIdCommand: FindEffectByIdCommand;

  constructor(
    @InjectModel(Effect.name)
    private imageModel: Model<EffectDocument>,
  ) {}

  execute(effectId: string): Observable<EffectDocument | any> {
    return this.findEffectByIdCommand.execute(effectId).pipe(
      switchMap((effectfound) => {
        return from(this.imageModel.findByIdAndDelete(effectfound)).pipe(
          catchError((err) => {
            const errorMessage = `Error deleting effect ${effectId}: ${err.message}`;
            this.logger.error(errorMessage);
            throw new EffectInternalServerErrorException(errorMessage);
          }),
          tap((effectDeleted) =>
            this.logger.debug(`Effect: ${effectDeleted.name}, Deleted`),
          ),
        );
      }),
    );
  }
}
