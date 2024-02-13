import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class GetAnthenaByIdUsecase {
  constructor(private prismaService: PrismaService) {}

  async handle(anthenaId: string) {
    return await this.prismaService.anthena.findFirst({
      where: {
        id: anthenaId,
      },
      select: {
        alias: true,
        createdAt: true,
        updatedAt: true,
        name: true,
        id: true,
        childrenIpAddresses: {
          select: {
            fullIp: true,
            id: true,
            range: true,
            tail: true,
          },
        },
        mainIpAddress: {
          select: {
            fullIp: true,
            id: true,
            range: true,
            tail: true,
          },
        },
        Client: {
          select: {
            id: true,
            lastName: true,
            name: true,
            phone: true,
          },
        },
      },
    });
  }
}
