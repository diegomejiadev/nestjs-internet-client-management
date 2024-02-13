import { Module } from '@nestjs/common';
import { AnthenaService } from './presentation/services/anthena.service';
import { AnthenaController } from './presentation/controller/anthena.controller';
import { CreateAnthenaUsecase } from './application/usecases/create-anthena.usecase';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AnthenaController],
  providers: [AnthenaService, CreateAnthenaUsecase],
})
export class AnthenaModule {}
