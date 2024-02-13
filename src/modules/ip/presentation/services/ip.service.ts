import { Injectable } from '@nestjs/common';
import { CreateIpUsecase } from '../../application/create-ip.usecase';
import { CreateIpDto } from '../../domain/dto/create-ip.dto';
import { IResponse } from 'src/core/interfaces/response.interface';
import { ListIpUsecase } from '../../application/list-ip.usecase';
import { ListIpDto } from '../../domain/dto/list-ip.dto';

@Injectable()
export class IpService {
  constructor(
    private createIpUsecase: CreateIpUsecase,
    private listIpUsecase: ListIpUsecase,
  ) {}

  async createIp(body: CreateIpDto): Promise<IResponse<any>> {
    const data = await this.createIpUsecase.handle(body);

    return { data };
  }

  async listIp(query?: ListIpDto): Promise<IResponse<any>> {
    const data = await this.listIpUsecase.handle(query);

    return { count: data.length, data };
  }
}
