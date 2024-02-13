import { Injectable } from '@nestjs/common';
import { CreateIpUsecase } from '../../application/create-ip.usecase';
import { CreateIpDto } from '../../domain/dto/create-ip.dto';
import { IResponse } from 'src/core/interfaces/response.interface';
import { ListIpUsecase } from '../../application/list-ip.usecase';
import { ListIpDto } from '../../domain/dto/list-ip.dto';
import { GetIpByIdUsecase } from '../../application/get-ip-by-id.usecase';
import { DeleteIpByIdUsecase } from '../../application/delete-ip-by-id.usecase';

@Injectable()
export class IpService {
  constructor(
    private createIpUsecase: CreateIpUsecase,
    private listIpUsecase: ListIpUsecase,
    private getIpByIdUsecase: GetIpByIdUsecase,
    private deleteIpByIdUsecase: DeleteIpByIdUsecase,
  ) {}

  async createIp(body: CreateIpDto): Promise<IResponse<any>> {
    const data = await this.createIpUsecase.handle(body);

    return { data };
  }

  async listIp(query?: ListIpDto): Promise<IResponse<any>> {
    const data = await this.listIpUsecase.handle(query);

    return { count: data.length, data };
  }

  async getIpById(ipAddressId: number): Promise<IResponse<any>> {
    const data = await this.getIpByIdUsecase.handle(ipAddressId);

    return { data };
  }

  async deleteIpById(ipAddress: number): Promise<IResponse<boolean>> {
    const data = await this.deleteIpByIdUsecase.handle(ipAddress);

    return { data };
  }
}
