import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateAnthenaDto } from '../../domain/dto/create-anthena.dto';
import { createIpBody } from 'src/modules/ip/domain/utils/create-ip-body';

@Injectable()
export class CreateAnthenaUsecase {
  constructor(private prismaService: PrismaService) {}

  async handle(body: CreateAnthenaDto) {
    const { alias, childrenIpAddresses, clientId, mainIpAddress, name } = body;

    const mainIpAddressBody = mainIpAddress
      ? createIpBody(mainIpAddress)
      : null;

    //TODO preguntar si un IP interna se puede repetir en la BD
    const childrenIpAddressBody = childrenIpAddresses?.length
      ? childrenIpAddresses.map((ipAddress) => createIpBody(ipAddress))
      : [];

    //* 1. Creamos la antena
    const toCreateAnthena = await this.prismaService.anthena.create({
      data: {
        name,
        alias,
        ...(clientId && {
          Client: {
            connect: {
              id: clientId,
            },
          },
        }),
        ...(childrenIpAddressBody && {
          childrenIpAddresses: {
            createMany: {
              data: [...childrenIpAddressBody],
            },
          },
        }),
        ...(mainIpAddressBody && {
          mainIpAddress: {
            create: {
              ...mainIpAddressBody,
            },
          },
        }),
      },
    });

    return toCreateAnthena;
  }
}
