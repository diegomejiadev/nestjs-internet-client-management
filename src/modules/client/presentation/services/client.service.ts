import { Injectable } from '@nestjs/common';
import { CreateClientUsecase } from '../../application/create-client. usecase';
import { CreateClientDto } from '../../domain/dto/create-client.dto';
import { IResponse } from 'src/core/interfaces/response.interface';

@Injectable()
export class ClientService {
  constructor(private createClientUsecase: CreateClientUsecase) {}

  async createClient(body: CreateClientDto): Promise<IResponse<any>> {
    const data = await this.createClientUsecase.handle(body);

    return { data };
  }
}
