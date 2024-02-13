import { Injectable } from '@nestjs/common';
import {
  AnthenaOrderAttributeEnum,
  ListAnthenaDto,
} from '../../domain/dto/list-anthena.dto';
import { PrismaService } from 'src/database/prisma.service';
import { Prisma } from '@prisma/client';
import { getSkip, getTake } from 'src/utils/dto';

@Injectable()
export class ListAnthenaUsecase {
  constructor(private prismaService: PrismaService) {}

  private getSelectQuery() {
    return {
      alias: true,
      childrenIpAddresses: {
        select: {
          id: true,
          fullIp: true,
        },
      },
      mainIpAddress: {
        select: {
          id: true,
          fullIp: true,
        },
      },
      Client: {
        select: {
          id: true,
          lastName: true,
          name: true,
        },
      },
      id: true,
      name: true,
      createdAt: true,
      updatedAt: true,
    };
  }

  private buildQuery(query: ListAnthenaDto) {
    let where: Prisma.AnthenaWhereInput = {};
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
    if (query.alias)
      where.alias = { contains: query.alias, mode: 'insensitive' };
    if (query.endDate) where.createdAt = { lte: query.endDate };
    if (query.startDate) where.createdAt = { gte: query.startDate };
    if (query.name) where.name = { contains: query.name, mode: 'insensitive' };

    if (query?.hasAlias != null) {
      if (query.hasAlias == true) {
        where.alias = {
          not: null,
        };
      } else {
        where.alias = { equals: null };
      }
    }

    //* Hacemos el where del cliente
    if (query.clientId) where.clientId = { equals: query.clientId };
    if (query.clientName) {
      where = {
        ...where,
        AND: [
          { Client: { name: { contains: query.clientName } } },
          { clientId: { not: null } },
        ],
      };
    }
    if (query.clientLastName) {
      where = {
        ...where,
        AND: [
          { Client: { lastName: { contains: query.clientLastName } } },
          { clientId: { not: null } },
        ],
      };
    }

    //* Hacemos el where de las IPs
    if (query.ipAddress) {
      where = {
        ...where,
        OR: [
          {
            mainIpAddress: {
              fullIp: {
                contains: query.ipAddress,
              },
            },
          },
          {
            childrenIpAddresses: {
              some: {
                fullIp: {
                  contains: query.ipAddress,
                },
              },
            },
          },
        ],
      };
    }

    return { where, whereClient };
  }

  private getOrderQuery(query: ListAnthenaDto): any {
    const orderType = query.order || 'desc';

    if (!query.orderAttribute) return { updatedAt: orderType };

    switch (query.orderAttribute) {
      case AnthenaOrderAttributeEnum.ALIAS:
        return { alias: orderType };

      case AnthenaOrderAttributeEnum.CREATED_AT:
        return { createdAt: orderType };

      case AnthenaOrderAttributeEnum.NAME:
        return { name: orderType };

      case AnthenaOrderAttributeEnum.UPDATED_AT:
        return { updatedAt: orderType };

      default:
        return { updatedAt: orderType };
    }
  }

  async handle(query?: ListAnthenaDto) {
    const { where, whereClient } = this.buildQuery(query);

    return await this.prismaService.anthena.findMany({
      select: { ...this.getSelectQuery() },
      skip: getSkip(query),
      take: getTake(query),
      orderBy: { ...this.getOrderQuery(query) },
      where: {
        ...where,
        Client: {
          ...whereClient,
        },
      },
    });
  }
}
