import { Module } from '@nestjs/common';
import { AnthenaService } from './presentation/services/anthena.service';
import { AnthenaController } from './presentation/controller/anthena.controller';
import { CreateAnthenaUsecase } from './application/usecases/create-anthena.usecase';
import { DatabaseModule } from 'src/database/database.module';
import { ListAnthenaUsecase } from './application/usecases/list-anthena.usecase';
import { GetAnthenaByIdUsecase } from './application/usecases/get-anthena-by-id.usecase';
import { DeleteAnthenaByIdUsecase } from './application/usecases/delete-anthena-by-id.usecase';
import { UpdateAnthenaUsecase } from './application/usecases/update-anthena.usecase';
import { IpModule } from '../ip/ip.module';

@Module({
  imports: [DatabaseModule, IpModule],
  controllers: [AnthenaController],
  providers: [
    AnthenaService,
    CreateAnthenaUsecase,
    ListAnthenaUsecase,
    GetAnthenaByIdUsecase,
    DeleteAnthenaByIdUsecase,
    UpdateAnthenaUsecase,
  ],
})
export class AnthenaModule {}
