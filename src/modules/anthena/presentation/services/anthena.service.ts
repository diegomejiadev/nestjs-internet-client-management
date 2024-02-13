import { Injectable } from '@nestjs/common';
import { CreateAnthenaUsecase } from '../../application/usecases/create-anthena.usecase';
import { CreateAnthenaDto } from '../../domain/dto/create-anthena.dto';
import { IResponse } from 'src/core/interfaces/response.interface';

@Injectable()
export class AnthenaService {
  constructor(private createAnthenaUsecase: CreateAnthenaUsecase) {}

  async createAnthena(body: CreateAnthenaDto): Promise<IResponse<any>> {
    const data = await this.createAnthenaUsecase.handle(body);

    return { data };
  }
}
