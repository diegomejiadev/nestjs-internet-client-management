import { Module } from '@nestjs/common';
import { IpController } from './presentation/controllers/ip.controller';
import { IpService } from './presentation/services/ip.service';
import { CreateIpUsecase } from './application/create-ip.usecase';
import { DatabaseModule } from 'src/database/database.module';
import { ListIpUsecase } from './application/list-ip.usecase';
import { GetIpByIdUsecase } from './application/get-ip-by-id.usecase';

@Module({
  imports: [DatabaseModule],
  controllers: [IpController],
  providers: [IpService, CreateIpUsecase, ListIpUsecase, GetIpByIdUsecase],
})
export class IpModule {}
