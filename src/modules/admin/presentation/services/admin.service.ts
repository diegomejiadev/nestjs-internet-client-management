import { Injectable } from '@nestjs/common';
import { CreateAdminUsecase } from '../../application/usecases/create-admin.usecase';
import { ListAdminUsecase } from '../../application/usecases/list-admin.usecase';
import { CreateAdminDto } from '../../domain/dto/create-admin.dto';
import { IResponse } from 'src/core/interfaces/response.interface';
import { ListAdminDto } from '../../domain/dto/list-admin.dto';

@Injectable()
export class AdminService {
  constructor(
    private createAdminUsecase: CreateAdminUsecase,
    private listAdminUsecase: ListAdminUsecase,
  ) {}

  async createAdmin(body: CreateAdminDto): Promise<IResponse<any>> {
    const data = await this.createAdminUsecase.handle(body);

    return { data };
  }

  async listAdmin(query?: ListAdminDto): Promise<IResponse<any>> {
    const data = await this.listAdminUsecase.handle(query);

    return { count: data.length, data };
  }
}
