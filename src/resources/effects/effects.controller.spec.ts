import { Test, TestingModule } from '@nestjs/testing';
import { EffectsController } from './effects.controller';
import { EffectsService } from './effects.service';

describe('EffectsController', () => {
  let controller: EffectsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EffectsController],
      providers: [EffectsService],
    }).compile();

    controller = module.get<EffectsController>(EffectsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
