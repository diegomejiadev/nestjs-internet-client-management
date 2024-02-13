import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class GetClientByIdUsecase {
  constructor(private prismaService: PrismaService) {}

  async handle(clientId: string) {
    return await this.prismaService.client.findFirst({
      where: {
        id: clientId,
      },
      select: {
        id: true,
        lastName: true,
        name: true,
        paymentDay: true,
        phone: true,
        physicalAddress: true,
        referenceAddresses: true,
        Anthenas: {
          select: {
            alias: true,
            name: true,
            childrenIpAddresses: {
              select: {
                fullIp: true,
                id: true,
              },
            },
            mainIpAddress: {
              select: {
                fullIp: true,
                id: true,
              },
            },
          },
        },
        Payments: {
          skip: 0,
          take: 5,
          orderBy: { updatedAt: 'desc' },
          select: {
            id: true,
            details: true,
            createdAt: true,
            updatedAt: true,
            SubPayments: {
              select: {
                amount: true,
                endDate: true,
                id: true,
                startDate: true,
              },
            },
            Receipts: {
              select: {
                fileUrl: true,
                createdAt: true,
                id: true,
                updatedAt: true,
              },
            },
          },
        },
      },
    });
  }
}
