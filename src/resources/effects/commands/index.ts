import { CreateEffectCommand } from './createEffect.cmd';
import { DeleteEffectCommand } from './deleteEffect.cmd';
import { FindEffectByIdCommand } from './findEffecById.cmd';
import { FindEffectsCommand } from './findEffects.cmd';
import { UpdateEffectCommand } from './updateEffect.cmd';

export const EffectsCommands = [
  CreateEffectCommand,
  FindEffectsCommand,
  FindEffectByIdCommand,
  UpdateEffectCommand,
  DeleteEffectCommand,
];
