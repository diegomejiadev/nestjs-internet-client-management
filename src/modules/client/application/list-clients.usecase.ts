import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { ListClientDto } from '../domain/dto/list-client.dto';
import { Prisma } from '@prisma/client';
import { getSkip, getTake } from 'src/utils/dto';

@Injectable()
export class ListClientsUsecase {
  constructor(private prismaService: PrismaService) {}

  private getSelectQuery(): Prisma.ClientSelect {
    return {
      id: true,
      name: true,
      lastName: true,
      paymentDay: true,
      phone: true,
      isSleeping: true,
      isRetired: true,
    };
  }

  private getOrderQuery(query: ListClientDto) {
    return { [query?.orderAttribute || 'lastName']: query.order || 'asc' };
  }

  private buildWhereQuery(query: ListClientDto) {
    let where: Prisma.ClientWhereInput = {};
    let whereAnthenas: Prisma.AnthenaListRelationFilter = {};
    let wherePayments: Prisma.PaymentListRelationFilter = {};

    //* El query por defecto
    if (query.name) where.name = { contains: query.name, mode: 'insensitive' };
    if (query.lastName)
      where.lastName = { contains: query.lastName, mode: 'insensitive' };
    if (query.physicalAddress)
      where.physicalAddress = {
        contains: query.physicalAddress,
        mode: 'insensitive',
      };
    if (query.referenceAddress)
      where.referenceAddresses = { has: query.referenceAddress };
    if (query.phone) where.phone = { has: query.phone };
    if (query.paymentDay) where.paymentDay = { equals: query.paymentDay };
    if (query?.showRetired == true) {
      where.isRetired = { equals: true };
    } else {
      where.isRetired = { equals: false };
    }

    if (query?.showSleeping == true) {
      where.isSleeping = { equals: true };
    } else {
      where.isSleeping = { equals: false };
    }

    //* El query anidado de las IPs
    if (query.ipAddress) {
      whereAnthenas = {
        ...whereAnthenas,
        some: {
          OR: [
            {
              mainIpAddress: {
                fullIp: { contains: query.ipAddress },
              },
            },
            {
              childrenIpAddresses: {
                some: {
                  fullIp: { contains: query.ipAddress },
                },
              },
            },
          ],
        },
      };
    }

    //* El query anidado de los pagos
    if (query?.hasMissingReceipts == true) {
      where = {
        ...where,
        AND: [
          {
            isSleeping: false,
          },
          {
            isRetired: false,
          },
        ],
      };

      if (
        query.hasMissingReceiptsEndDate &&
        query.hasMissingReceiptsStartDate
      ) {
        wherePayments = {
          ...wherePayments,
          //TODO
          //   every: {
          //     SubPayments: {
          //       some: {
          //         start_date: {
          //           gte: query.hasMissingReceiptsStartDate,
          //         },
          //         end_date: {
          //           lte: query.hasMissingReceiptsEndDate,
          //         },
          //       },
          //     },
          //   },
          some: {
            Receipts: {
              none: {},
            },
          },
        };
      } else {
        wherePayments = {
          ...wherePayments,
          some: {
            Receipts: {
              none: {},
            },
          },
        };
      }
    }

    if (query.hasNotPaidCurrentMonth) {
      const currentDate = new Date();

      wherePayments = {
        ...wherePayments,
        every: {
          SubPayments: {
            every: {
              endDate: {
                lte: currentDate,
              },
            },
          },
        },
      };
    }

    if (query.monthsWithoutPaying) {
      const currentDate = new Date();
      currentDate.setMonth(currentDate.getMonth() - query.monthsWithoutPaying);

      wherePayments = {
        ...wherePayments,
        every: {
          SubPayments: {
            every: {
              endDate: {
                lte: currentDate,
              },
            },
          },
        },
      };
    }

    return { where, whereAnthenas, wherePayments };
  }

  async handle(query?: ListClientDto) {
    const { where, whereAnthenas, wherePayments } = this.buildWhereQuery(query);

    return await this.prismaService.client.findMany({
      skip: getSkip(query),
      take: getTake(query),
      orderBy: { ...this.getOrderQuery(query) },
      select: {
        ...this.getSelectQuery(),
      },
      where: {
        ...where,
        Anthenas: { ...whereAnthenas },
        Payments: { ...wherePayments },
      },
    });
  }
}
