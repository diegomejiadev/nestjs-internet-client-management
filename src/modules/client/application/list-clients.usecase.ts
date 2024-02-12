import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { ListClientDto } from '../domain/dto/list-client.dto';
import { Prisma } from '@prisma/client';
import { getSkip, getTake } from 'src/utils/dto';

@Injectable()
export class ListClientsUsecase {
  constructor(private prismaService: PrismaService) {}

  private getSelectQuery() {
    return {
      id: true,
      name: true,
      last_name: true,
      payment_day: true,
      phone: true,
    };
  }

  private getOrderQuery(query: ListClientDto) {
    return { [query?.orderAttribute || 'last_name']: query.order || 'asc' };
  }

  private buildWhereQuery(query: ListClientDto) {
    const where: Prisma.ClientWhereInput = {};
    let whereIpAdresses: Prisma.IpAdressListRelationFilter = {};
    let wherePayments: Prisma.PaymentListRelationFilter = {};

    //* El query por defecto
    if (query.name) where.name = { contains: query.name, mode: 'insensitive' };
    if (query.lastName)
      where.last_name = { contains: query.lastName, mode: 'insensitive' };
    if (query.physicalAddress)
      where.physical_address = {
        contains: query.physicalAddress,
        mode: 'insensitive',
      };
    if (query.referenceAddress)
      where.reference_addresses = { has: query.referenceAddress };
    if (query.phone) where.phone = { has: query.phone };
    if (query.paymentDay) where.payment_day = { equals: query.paymentDay };

    //* El query anidado de las IPs
    if (query.ipAddress) {
      whereIpAdresses = {
        ...whereIpAdresses,
        some: {
          full_ip: {
            contains: query.ipAddress,
          },
        },
      };
    }

    //* El query anidado de los pagos
    if (query.hasMissingReceipts) {
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
              end_date: {
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
              end_date: {
                lte: currentDate,
              },
            },
          },
        },
      };
    }

    return { where, whereIpAdresses, wherePayments };
  }

  async handle(query?: ListClientDto) {
    console.log(query);

    const { where, whereIpAdresses, wherePayments } =
      this.buildWhereQuery(query);

    return await this.prismaService.client.findMany({
      skip: getSkip(query),
      take: getTake(query),
      orderBy: { ...this.getOrderQuery(query) },
      select: {
        ...this.getSelectQuery(),
      },
      where: {
        ...where,
        ipAddresses: { ...whereIpAdresses },
        payments: { ...wherePayments },
      },
    });
  }
}
