import { Injectable } from '@nestjs/common';
import { CreateAdminUsecase } from '../../application/usecases/create-admin.usecase';
import { ListAdminUsecase } from '../../application/usecases/list-admin.usecase';
import { CreateAdminDto } from '../../domain/dto/create-admin.dto';
import { IResponse } from 'src/core/interfaces/response.interface';
import { ListAdminDto } from '../../domain/dto/list-admin.dto';
import { GetAdminByIdUsecase } from '../../application/usecases/get-admin-by-id.usecase';

@Injectable()
export class AdminService {
  constructor(
    private createAdminUsecase: CreateAdminUsecase,
    private listAdminUsecase: ListAdminUsecase,
    private getAdminByIdUsecase: GetAdminByIdUsecase,
  ) {}

  async createAdmin(body: CreateAdminDto): Promise<IResponse<any>> {
    const data = await this.createAdminUsecase.handle(body);

    return { data };
  }

  async listAdmin(query?: ListAdminDto): Promise<IResponse<any>> {
    const data = await this.listAdminUsecase.handle(query);

    return { count: data.length, data };
  }

  async getAdminById(adminId: string): Promise<IResponse<any>> {
    const data = await this.getAdminByIdUsecase.handle(adminId);

    return { data };
  }
}
