import { Injectable } from '@nestjs/common';
import { ListAdminDto } from '../../domain/dto/list-admin.dto';
import { PrismaService } from 'src/database/prisma.service';
import { getSkip, getTake } from 'src/utils/dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ListAdminUsecase {
  constructor(private prismaService: PrismaService) {}

  private getSelectQuery() {
    return {
      createdAt: true,
      updatedAt: true,
      email: true,
      id: true,
      name: true,
    };
  }

  private buildWhereQuery(query: ListAdminDto) {
    const where: Prisma.AdminWhereInput = {};

    //* El where base
    if (query.email)
      where.email = { contains: query.email, mode: 'insensitive' };
    if (query.name) where.name = { contains: query.name, mode: 'insensitive' };

    return { where };
  }

  async handle(query?: ListAdminDto) {
    const { where } = this.buildWhereQuery(query);

    return await this.prismaService.admin.findMany({
      skip: getSkip(query),
      take: getTake(query),
      select: { ...this.getSelectQuery() },
      orderBy: {
        name: 'asc',
      },
      where,
    });
  }
}
