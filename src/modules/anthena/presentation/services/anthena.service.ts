import { Injectable } from '@nestjs/common';
import { CreateAnthenaUsecase } from '../../application/usecases/create-anthena.usecase';
import { CreateAnthenaDto } from '../../domain/dto/create-anthena.dto';
import { IResponse } from 'src/core/interfaces/response.interface';
import { ListAnthenaUsecase } from '../../application/usecases/list-anthena.usecase';
import { ListAnthenaDto } from '../../domain/dto/list-anthena.dto';
import { GetAnthenaByIdUsecase } from '../../application/usecases/get-anthena-by-id.usecase';
import { DeleteAnthenaByIdUsecase } from '../../application/usecases/delete-anthena-by-id.usecase';
import { UpdateAnthenaUsecase } from '../../application/usecases/update-anthena.usecase';
import { UpdateAnthenaDto } from '../../domain/dto/update-anthena.dto';

@Injectable()
export class AnthenaService {
  constructor(
    private createAnthenaUsecase: CreateAnthenaUsecase,
    private listAnthenaUsecase: ListAnthenaUsecase,
    private getAnthenaByIdUsecase: GetAnthenaByIdUsecase,
    private deleteAnthenaByIdUsecase: DeleteAnthenaByIdUsecase,
    private updateAnthenaUsecase: UpdateAnthenaUsecase,
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

  async deleteAnthenaById(anthenaId: string): Promise<IResponse<boolean>> {
    const data = await this.deleteAnthenaByIdUsecase.handle(anthenaId);

    return { data };
  }

  async updateAnthena(
    anthenaId: string,
    body: UpdateAnthenaDto,
  ): Promise<IResponse<any>> {
    const data = await this.updateAnthenaUsecase.handle(anthenaId, body);

    return { data };
  }
}
