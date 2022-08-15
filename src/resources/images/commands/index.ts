import { ApplyFiltersCommand } from './applyFilters.cmd';
import { ApplyCropCommand } from './applyCrop.cmd';
import { ProcessImageCommand } from './processImage.cmd';
import { ApplyRotationCommand } from './applyRotation.cmd';
import { ApplyResizeCommand } from './applyResize.cmd';

export const ImageProcessingCommands = [
  ProcessImageCommand,
  ApplyFiltersCommand,
  ApplyCropCommand,
  ApplyRotationCommand,
  ApplyResizeCommand
];
