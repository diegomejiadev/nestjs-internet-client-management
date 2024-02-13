import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class DeleteIpByIdUsecase {
  constructor(private prismaService: PrismaService) {}

  async handle(ipAddress: number) {
    const data = await this.prismaService.ipAdress.delete({
      where: {
        id: ipAddress,
      },
    });

    return true;
  }
}
