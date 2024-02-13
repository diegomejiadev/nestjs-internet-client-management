import { Test, TestingModule } from '@nestjs/testing';
import { AnthenaController } from './anthena.controller';

describe('AnthenaController', () => {
  let controller: AnthenaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnthenaController],
    }).compile();

    controller = module.get<AnthenaController>(AnthenaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
