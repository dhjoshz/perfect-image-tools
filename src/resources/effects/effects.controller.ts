import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { catchError, map, throwError } from 'rxjs';
import { EffectConflictException } from '../../exception/effect/effect.conflict.exception';
import { EffectInternalServerErrorException } from '../../exception/effect/effect.internal.server.error.exception';
import { EffectNotFoundException } from '../../exception/effect/effect.not.found.exception';
import { Effect } from '../../models/effect.model';
import { CreateEffectCommand } from './commands/createEffect.cmd';
import { DeleteEffectCommand } from './commands/deleteEffect.cmd';
import { FindEffectByIdCommand } from './commands/findEffecById.cmd';
import { FindEffectsCommand } from './commands/findEffects.cmd';
import { UpdateEffectCommand } from './commands/updateEffect.cmd';

@ApiTags('effects')
@Controller('effects')
export class EffectsController {
  @Inject()
  private readonly createEffectCommand: CreateEffectCommand;

  @Inject()
  private readonly findEffectsCommand: FindEffectsCommand;

  @Inject()
  private readonly findEffectByIdCommand: FindEffectByIdCommand;

  @Inject()
  private readonly updateEffectCommand: UpdateEffectCommand;

  @Inject()
  private readonly deleteEffectCommand: DeleteEffectCommand;

  private errorHandler = (error) => {
    let handledError = error;
    if (error instanceof EffectNotFoundException) {
      handledError = new NotFoundException(error.message);
    }
    if (error instanceof EffectInternalServerErrorException) {
      handledError = new InternalServerErrorException(error.message);
    }
    if (error instanceof EffectConflictException) {
      handledError = new ConflictException(error.message);
    }
    return throwError(() => handledError);
  };

  @ApiCreatedResponse({
    description: 'Image effect successfully created',
  })
  @ApiBadRequestResponse({
    description: 'Invalid effect properties',
  })
  @ApiConflictResponse({
    description: 'Conflict creating new image effect',
  })
  @Post()
  createEffect(@Body() effect: Effect) {
    return this.createEffectCommand
      .execute(effect)
      .pipe(catchError((err) => this.errorHandler(err)));
  }

  @ApiOkResponse({
    description: 'Image effects successfully found',
  })
  @Get()
  findEffects() {
    return this.findEffectsCommand
      .execute()
      .pipe(catchError((err) => this.errorHandler(err)));
  }

  @ApiOkResponse({
    description: 'Image effect successfully found',
  })
  @ApiNotFoundResponse({
    description: 'Image effect not found',
  })
  @Get(':id')
  findEffectById(@Param('id') effectId: string) {
    return this.findEffectByIdCommand
      .execute(effectId)
      .pipe(catchError((err) => this.errorHandler(err)));
  }

  @ApiCreatedResponse({
    description: 'Image effect successfully updated',
  })
  @ApiBadRequestResponse({
    description: 'Invalid effect properties',
  })
  @ApiNotFoundResponse({
    description: 'Image effect not found',
  })
  @ApiConflictResponse({
    description: 'Conflict creating new image effect',
  })
  @Patch(':id')
  updateEffectById(@Param('id') effectId: string, @Body() effect: Effect) {
    return this.updateEffectCommand
      .execute(effectId, effect)
      .pipe(catchError((err) => this.errorHandler(err)));
  }

  @ApiNoContentResponse({
    description: 'Image effect successfully deleted',
  })
  @ApiNotFoundResponse({
    description: 'Image effect not found',
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteEffectById(@Param('id') effectId: string) {
    return this.deleteEffectCommand
      .execute(effectId)
      .pipe(catchError((err) => this.errorHandler(err)));
  }
}
