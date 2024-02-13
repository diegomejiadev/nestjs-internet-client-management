import { Injectable } from '@nestjs/common';
import { CreateClientUsecase } from '../../application/create-client. usecase';
import { CreateClientDto } from '../../domain/dto/create-client.dto';
import { IResponse } from 'src/core/interfaces/response.interface';
import { ListClientsUsecase } from '../../application/list-clients.usecase';
import { ListClientDto } from '../../domain/dto/list-client.dto';
import { GetClientByIdUsecase } from '../../application/get-client-by-id.usecase';
import { ToggleClientRetiredByIdUsecase } from '../../application/toggle-retired-client-by-id.usecase';
import { ToggleClientSleepingByIdUsecase } from '../../application/toggle-sleeping-client-by-id.usecase';
import { ToggleClientRetiredDto } from '../../domain/dto/toggle-retired-client.dto';
import { ToggleClientSleepingDto } from '../../domain/dto/toggle-sleeping-client.dto';

@Injectable()
export class ClientService {
  constructor(
    private createClientUsecase: CreateClientUsecase,
    private listClientsUsecase: ListClientsUsecase,
    private getClientByIdUsecase: GetClientByIdUsecase,
    private toggleClientRetiredByIdUsecase: ToggleClientRetiredByIdUsecase,
    private toggleClientSleepingByIdUsecase: ToggleClientSleepingByIdUsecase,
  ) {}

  async createClient(body: CreateClientDto): Promise<IResponse<any>> {
    const data = await this.createClientUsecase.handle(body);

    return { data };
  }

  async listClients(query?: ListClientDto): Promise<IResponse<any>> {
    const data = await this.listClientsUsecase.handle(query);

    return { count: data.length, data };
  }

  async getClientById(clientId: string): Promise<IResponse<any>> {
    const data = await this.getClientByIdUsecase.handle(clientId);

    return { data };
  }

  async toggleClientRetiredById(
    clientId: string,
    body: ToggleClientRetiredDto,
  ): Promise<IResponse<any>> {
    const data = await this.toggleClientRetiredByIdUsecase.handle(
      clientId,
      body,
    );

    return { data };
  }

  async toggleClientSleepingById(
    clientId: string,
    body: ToggleClientSleepingDto,
  ): Promise<IResponse<any>> {
    const data = await this.toggleClientSleepingByIdUsecase.handle(
      clientId,
      body,
    );

    return { data };
  }
}
