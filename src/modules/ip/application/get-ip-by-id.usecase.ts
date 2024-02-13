import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class GetIpByIdUsecase {
  constructor(private prismaService: PrismaService) {}

  async handle(ipAddressId: number) {
    return await this.prismaService.ipAdress.findFirst({
      where: {
        id: ipAddressId,
      },
      select: {
        createdAt: true,
        fullIp: true,
        id: true,
        range: true,
        tail: true,
        updatedAt: true,
        parentAnthena: {
          select: {
            alias: true,
            name: true,
            Client: {
              select: {
                name: true,
                lastName: true,
                id: true,
              },
            },
          },
        },
        predecessorAnthena: {
          select: {
            alias: true,
            name: true,
            Client: {
              select: {
                name: true,
                lastName: true,
                id: true,
              },
            },
          },
        },
      },
    });
  }
}
