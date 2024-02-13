import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ClientController } from './presentation/controllers/client.controller';
import { ClientService } from './presentation/services/client.service';
import { CreateClientUsecase } from './application/create-client. usecase';
import { ListClientsUsecase } from './application/list-clients.usecase';
import { GetClientByIdUsecase } from './application/get-client-by-id.usecase';
import { ToggleClientRetiredByIdUsecase } from './application/toggle-retired-client-by-id.usecase';
import { ToggleClientSleepingByIdUsecase } from './application/toggle-sleeping-client-by-id.usecase';

@Module({
  imports: [DatabaseModule],
  controllers: [ClientController],
  providers: [
    ClientService,
    CreateClientUsecase,
    ListClientsUsecase,
    GetClientByIdUsecase,
    ToggleClientRetiredByIdUsecase,
    ToggleClientSleepingByIdUsecase,
  ],
})
export class ClientModule {}
