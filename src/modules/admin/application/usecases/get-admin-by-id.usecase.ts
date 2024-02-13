import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class GetAdminByIdUsecase {
  constructor(private prismaService: PrismaService) {}

  async handle(adminId: string) {
    return await this.prismaService.admin.findFirst({
      where: {
        id: adminId,
      },
      select: {
        createdAt: true,
        email: true,
        id: true,
        name: true,
        updatedAt: true,
      },
    });
  }
}
