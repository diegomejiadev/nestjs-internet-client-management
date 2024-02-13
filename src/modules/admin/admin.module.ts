import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { CreateAdminUsecase } from './application/usecases/create-admin.usecase';
import { AdminService } from './presentation/services/admin.service';
import { AdminController } from './presentation/controllers/admin.controller';
import { ListAdminUsecase } from './application/usecases/list-admin.usecase';
import { GetAdminByIdUsecase } from './application/usecases/get-admin-by-id.usecase';

@Module({
  imports: [DatabaseModule],
  providers: [
    CreateAdminUsecase,
    AdminService,
    ListAdminUsecase,
    GetAdminByIdUsecase,
  ],
  controllers: [AdminController],
})
export class AdminModule {}
