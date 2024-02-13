import { Injectable } from '@nestjs/common';
import {
  ListPaymentDto,
  PaymentOrderAttributeEnum,
} from '../../domain/dto/list-payment.dto';
import { PrismaService } from 'src/database/prisma.service';
import { getSkip, getTake } from 'src/utils/dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ListPaymentsUsecase {
  constructor(private prismaService: PrismaService) {}

  private getSelectQuery() {
    return {
      Client: {
        select: {
          id: true,
          lastName: true,
          name: true,
          phone: true,
        },
      },
      details: true,
      clientId: true,
      id: true,
      Receipts: {
        select: {
          fileUrl: true,
          id: true,
        },
      },
      SubPayments: {
        select: {
          amount: true,
          endDate: true,
          id: true,
          startDate: true,
        },
      },
    };
  }

  private getOrderQuery(query: ListPaymentDto): any {
    const orderType = query.order || 'desc';

    if (!query.orderAttribute) return { updated_at: orderType };

    switch (query.orderAttribute) {
      case PaymentOrderAttributeEnum.CREATED_AT:
        return {
          createdAt: orderType,
        };

      case PaymentOrderAttributeEnum.UPDATED_AT:
        return {
          updatedAt: orderType,
        };

      case PaymentOrderAttributeEnum.CLIENT_NAME:
        return {
          Client: {
            name: orderType,
          },
        };

      case PaymentOrderAttributeEnum.CLIENT_LAST_NAME:
        return {
          Client: {
            lastName: orderType,
          },
        };

      default:
        return { updatedAt: orderType };
    }
  }

  private buildWhereQuery(query: ListPaymentDto) {
    const where: Prisma.PaymentWhereInput = {};
    let whereReceipts: Prisma.ReceiptListRelationFilter = {};
    let whereSubPayments: Prisma.SubPaymentListRelationFilter = {};
    const whereClient:
      | (Prisma.Without<
          Prisma.ClientNullableRelationFilter,
          Prisma.ClientWhereInput
        > &
          Prisma.ClientWhereInput)
      | (Prisma.Without<
          Prisma.ClientWhereInput,
          Prisma.ClientNullableRelationFilter
        > &
          Prisma.ClientNullableRelationFilter) = {};

    //* Hacemos el where base
    if (query.details)
      where.details = { contains: query.details, mode: 'insensitive' };

    //* Hacemos el where del cliente
    if (query.clientLastName)
      whereClient.lastName = {
        contains: query.clientLastName,
        mode: 'insensitive',
      };

    if (query.clientName)
      whereClient.name = { contains: query.clientName, mode: 'insensitive' };

    //* Hacemos el where de los recibos
    if (query?.hasReceipts != null) {
      if (query.hasReceipts == true) {
        whereReceipts = {
          ...whereReceipts,
          none: {},
        };
      } else {
        whereReceipts = {
          ...whereReceipts,
          every: {},
        };
      }
    }

    //* Hacemos el where de los subpagos
    if (query.startDate) {
      whereSubPayments = {
        ...whereSubPayments,
        every: {
          startDate: {
            gte: query.startDate,
          },
        },
      };
    }

    if (query.endDate) {
      whereSubPayments = {
        ...whereSubPayments,
        every: {
          endDate: {
            lte: query.endDate,
          },
        },
      };
    }

    return { where, whereClient, whereReceipts, whereSubPayments };
  }

  async handle(query?: ListPaymentDto) {
    const { where, whereClient, whereReceipts, whereSubPayments } =
      this.buildWhereQuery(query);

    return await this.prismaService.payment.findMany({
      skip: getSkip(query),
      take: getTake(query),
      orderBy: {
        ...this.getOrderQuery(query),
      },
      where: {
        ...where,
        Client: {
          ...whereClient,
        },
        Receipts: {
          ...whereReceipts,
        },
        SubPayments: {
          ...whereSubPayments,
        },
      },
      select: {
        ...this.getSelectQuery(),
      },
    });
  }
}
