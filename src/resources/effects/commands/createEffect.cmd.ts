import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BusinessLogicCommand } from 'libs/commons/src';
import { Model } from 'mongoose';
import { catchError, from, Observable, tap } from 'rxjs';
import { EffectConflictException } from 'src/exception/effect/effect.conflict.exception';
import { EffectInternalServerErrorException } from 'src/exception/effect/effect.internal.server.error.exception';
import { Effect } from 'src/models/effect.model';
import { EffectDocument } from 'src/schemas/effect.schema';

@Injectable()
export class CreateEffectCommand
  implements
    BusinessLogicCommand<Effect, EffectDocument, Observable<EffectDocument>>
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
        if (err?.code === 11000) {
          this.logger.error(`${errorMessage}, effect already exists`);
          throw new EffectConflictException(`${errorMessage}, effect already exists`);
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
