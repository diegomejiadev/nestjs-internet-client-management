import { Injectable } from '@nestjs/common';
import { CreateIpDto } from '../domain/dto/create-ip.dto';
import { createIpBody } from '../domain/utils/create-ip-body';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class CreateIpUsecase {
  constructor(private prismaService: PrismaService) {}

  async handle(body: CreateIpDto) {
    const { parentAnthenaId, predecessorAnthenaId, fullIp } = body;

    const ipBody = createIpBody(fullIp);

    return await this.prismaService.ipAdress.create({
      data: {
        ...ipBody,
        ...(parentAnthenaId && {
          parentAnthena: {
            connect: {
              id: parentAnthenaId,
            },
          },
        }),
        ...(predecessorAnthenaId && {
          predecessorAnthena: {
            connect: {
              id: predecessorAnthenaId,
            },
          },
        }),
      },
    });
  }
}
