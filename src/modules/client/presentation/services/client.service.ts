import { Injectable } from '@nestjs/common';
import { CreateClientUsecase } from '../../application/create-client. usecase';
import { CreateClientDto } from '../../domain/dto/create-client.dto';
import { IResponse } from 'src/core/interfaces/response.interface';
import { ListClientsUsecase } from '../../application/list-clients.usecase';
import { ListClientDto } from '../../domain/dto/list-client.dto';

@Injectable()
export class ClientService {
  constructor(
    private createClientUsecase: CreateClientUsecase,
    private listClientsUsecase: ListClientsUsecase,
  ) {}

  async createClient(body: CreateClientDto): Promise<IResponse<any>> {
    const data = await this.createClientUsecase.handle(body);

    return { data };
  }

  async listClients(query?: ListClientDto): Promise<IResponse<any>> {
    const data = await this.listClientsUsecase.handle(query);

    return { count: data.length, data };
  }
}
