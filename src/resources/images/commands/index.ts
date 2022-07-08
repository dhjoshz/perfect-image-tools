import { ApplyFiltersCommand } from './applyFilters.cmd';
import { ApplyCropCommand } from './applyCrop.cmd';
import { ProcessImageCommand } from './processImage.cmd';

export const ImageProcessingCommands = [
  ProcessImageCommand,
  ApplyFiltersCommand,
  ApplyCropCommand,
];
