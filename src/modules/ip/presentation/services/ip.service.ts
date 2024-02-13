import { Injectable } from '@nestjs/common';
import { CreateIpUsecase } from '../../application/create-ip.usecase';
import { CreateIpDto } from '../../domain/dto/create-ip.dto';
import { IResponse } from 'src/core/interfaces/response.interface';

@Injectable()
export class IpService {
  constructor(private createIpUsecase: CreateIpUsecase) {}

  async createIp(body: CreateIpDto): Promise<IResponse<any>> {
    const data = await this.createIpUsecase.handle(body);

    return { data };
  }
}
