import { Injectable } from '@nestjs/common';
import { CreateAnthenaUsecase } from '../../application/usecases/create-anthena.usecase';
import { CreateAnthenaDto } from '../../domain/dto/create-anthena.dto';
import { IResponse } from 'src/core/interfaces/response.interface';
import { ListAnthenaUsecase } from '../../application/usecases/list-anthena.usecase';
import { ListAnthenaDto } from '../../domain/dto/list-anthena.dto';
import { GetAnthenaByIdUsecase } from '../../application/usecases/get-anthena-by-id.usecase';

@Injectable()
export class AnthenaService {
  constructor(
    private createAnthenaUsecase: CreateAnthenaUsecase,
    private listAnthenaUsecase: ListAnthenaUsecase,
    private getAnthenaByIdUsecase: GetAnthenaByIdUsecase,
  ) {}

  async createAnthena(body: CreateAnthenaDto): Promise<IResponse<any>> {
    const data = await this.createAnthenaUsecase.handle(body);

    return { data };
  }

  async listAnthena(query?: ListAnthenaDto): Promise<IResponse<any>> {
    const data = await this.listAnthenaUsecase.handle(query);

    return { count: data.length, data };
  }

  async getAnthenaById(anthenaId: string): Promise<IResponse<any>> {
    const data = await this.getAnthenaByIdUsecase.handle(anthenaId);

    return { data };
  }
}
