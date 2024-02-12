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
          last_name: true,
          name: true,
          phone: true,
        },
      },
      details: true,
      client_id: true,
      id: true,
      Receipts: {
        select: {
          file_url: true,
          id: true,
        },
      },
      SubPayments: {
        select: {
          amount: true,
          end_date: true,
          id: true,
          start_date: true,
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
          created_at: orderType,
        };

      case PaymentOrderAttributeEnum.UPDATED_AT:
        return {
          updated_at: orderType,
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
            last_name: orderType,
          },
        };

      default:
        return { updated_at: orderType };
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
      whereClient.last_name = {
        contains: query.clientLastName,
        mode: 'insensitive',
      };

    if (query.clientName)
      whereClient.name = { contains: query.clientName, mode: 'insensitive' };

    //* Hacemos el where de los recibos
    if (query.hasReceipts) {
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
          start_date: {
            gte: query.startDate,
          },
        },
      };
    }

    if (query.endDate) {
      whereSubPayments = {
        ...whereSubPayments,
        every: {
          end_date: {
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
