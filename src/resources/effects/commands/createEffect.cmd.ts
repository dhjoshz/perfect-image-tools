import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BusinessLogicCommand } from '@app/commons';
import { Model } from 'mongoose';
import { catchError, from, Observable, tap } from 'rxjs';
import {
  EffectConflictException,
  EffectInternalServerErrorException,
} from '@exceptions';
import { Effect } from '@models';
import { EffectDocument } from '@schemas';
import { MONGOOSE_CONFLICT_ERROR_CODE } from 'config/constants';

@Injectable()
export class CreateEffectCommand
  implements BusinessLogicCommand<EffectDocument, Effect>
{
  private readonly logger = new Logger(CreateEffectCommand.name);

  constructor(
    @InjectModel(Effect.name)
    private imageModel: Model<EffectDocument>,
  ) {}

  execute(createEffectModel: Effect): Observable<EffectDocument> {
    return from(this.imageModel.create(createEffectModel)).pipe(
      catchError((err) => {
        const errorMessage = `Error creating effect "${createEffectModel.name}"`;
        if (err?.code === MONGOOSE_CONFLICT_ERROR_CODE) {
          this.logger.error(`${errorMessage}, effect already exists`);
          throw new EffectConflictException(
            `${errorMessage}, effect already exists`,
          );
        }
        this.logger.error(`${errorMessage}, ${err.message}`);
        throw new EffectInternalServerErrorException(
          `${errorMessage}, ${err.message}`,
        );
      }),
      tap((effectCreated) =>
        this.logger.debug(`New effect created: ${effectCreated.name}`),
      ),
    );
  }
}
