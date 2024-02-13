import { Test, TestingModule } from '@nestjs/testing';
import { AnthenaService } from './anthena.service';

describe('AnthenaService', () => {
  let service: AnthenaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnthenaService],
    }).compile();

    service = module.get<AnthenaService>(AnthenaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
