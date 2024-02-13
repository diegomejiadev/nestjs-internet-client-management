import { Injectable } from '@nestjs/common';
import { IpOrderAttributeEnum, ListIpDto } from '../domain/dto/list-ip.dto';
import { PrismaService } from 'src/database/prisma.service';
import { getSkip, getTake } from 'src/utils/dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ListIpUsecase {
  constructor(private prismaService: PrismaService) {}

  private getSelectQuery() {
    return {
      createdAt: true,
      fullIp: true,
      range: true,
      tail: true,
      id: true,
      parentAnthena: {
        select: {
          id: true,
        },
      },
      predecessorAnthena: {
        select: {
          id: true,
        },
      },
      updatedAt: true,
    };
  }

  private buildQuery(query: ListIpDto) {
    let where: Prisma.IpAdressWhereInput = {};

    //* Hacemos el where base
    if (query.fullIp) where.fullIp = { contains: query.fullIp };
    if (query.range) where.range = { equals: query.range };

    //* Hacemos el where de las anthena
    if (query.anthenaId) {
      where = {
        ...where,
        OR: [
          {
            parentAnthena: {
              id: query.anthenaId,
            },
          },
          {
            predecessorAnthena: {
              id: query.anthenaId,
            },
          },
        ],
      };
    }

    if (query.parentAnthenaId) {
      where = {
        ...where,
        parentAnthena: {
          id: query.parentAnthenaId,
        },
      };
    }

    if (query.predecessorAnthenaId) {
      where = {
        ...where,
        predecessorAnthena: {
          id: query.predecessorAnthenaId,
        },
      };
    }

    return { where };
  }

  private getOrderQuery(query: ListIpDto): any {
    const orderType = query.order || 'desc';

    if (!query.orderAttribute) return { updatedAt: orderType };

    switch (query.orderAttribute) {
      case IpOrderAttributeEnum.CREATED_AT:
        return { createdAt: orderType };

      case IpOrderAttributeEnum.UPDATED_AT:
        return { updatedAt: orderType };

      case IpOrderAttributeEnum.FULL_IP:
        return { fullIp: orderType };

      case IpOrderAttributeEnum.RANGE:
        return { range: orderType };

      default:
        return { updatedAt: orderType };
    }
  }

  async handle(query?: ListIpDto) {
    const { where } = this.buildQuery(query);

    return await this.prismaService.ipAdress.findMany({
      select: { ...this.getSelectQuery() },
      skip: getSkip(query),
      take: getTake(query),
      where: { ...where },
      orderBy: { ...this.getOrderQuery(query) },
    });
  }
}
