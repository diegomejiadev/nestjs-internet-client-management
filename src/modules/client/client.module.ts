import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ClientController } from './presentation/controllers/client.controller';
import { ClientService } from './presentation/services/client.service';
import { CreateClientUsecase } from './application/create-client. usecase';
import { ListClientsUsecase } from './application/list-clients.usecase';

@Module({
  imports: [DatabaseModule],
  controllers: [ClientController],
  providers: [ClientService, CreateClientUsecase, ListClientsUsecase],
})
export class ClientModule {}
