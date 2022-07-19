import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MONGOOSE_CONFLICT_ERROR_CODE } from '../../../../config/constants';
import { BusinessLogicCommand } from 'libs/commons/src';
import { Model } from 'mongoose';
import { catchError, from, Observable, switchMap, tap } from 'rxjs';
import { EffectConflictException } from '../../../exception/effect/effect.conflict.exception';
import { EffectInternalServerErrorException } from '../../../exception/effect/effect.internal.server.error.exception';
import { Effect } from '../../../../src/models/effect.model';
import { EffectDocument } from '../../../../src/schemas/effect.schema';
import { FindEffectByIdCommand } from './findEffecById.cmd';

@Injectable()
export class UpdateEffectCommand
  implements BusinessLogicCommand<Observable<EffectDocument>, string, Effect>
{
  private readonly logger = new Logger(UpdateEffectCommand.name);

  @Inject()
  private readonly findEffectByIdCommand: FindEffectByIdCommand;

  constructor(
    @InjectModel(Effect.name)
    private imageModel: Model<EffectDocument>,
  ) {}

  execute(
    effectId: string,
    effectModel: Effect,
  ): Observable<EffectDocument | any> {
    return this.findEffectByIdCommand.execute(effectId).pipe(
      switchMap((effectfound) => {
        return from(
          this.imageModel.findByIdAndUpdate(effectfound, effectModel),
        ).pipe(
          catchError((err) => {
            const errorMessage = `Error updating effect ${effectId}`;
            if (err?.code === MONGOOSE_CONFLICT_ERROR_CODE) {
              this.logger.error(`${errorMessage}, effect name already exists`);
              throw new EffectConflictException(
                `${errorMessage}, effect name already exists`,
              );
            }
            this.logger.error(`${errorMessage}, ${err.message}`);
            throw new EffectInternalServerErrorException(
              `${errorMessage}, ${err.message}`,
            );
          }),
          tap((effectUpdated) =>
            this.logger.debug(`Effect: ${effectUpdated.name}, Updated`),
          ),
        );
      }),
    );
  }
}
