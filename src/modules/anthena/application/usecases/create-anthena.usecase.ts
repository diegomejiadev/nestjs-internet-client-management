import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateAnthenaDto } from '../../domain/dto/create-anthena.dto';
import { GetIpsToCreateConnectUtils } from 'src/modules/ip/application/utils/get-ips-to-create-connect';

@Injectable()
export class CreateAnthenaUsecase {
  constructor(
    private prismaService: PrismaService,
    private getIpsToCreateConnect: GetIpsToCreateConnectUtils,
  ) {}

  async handle(body: CreateAnthenaDto) {
    let mainIpAddressFound: { id: number } = null;
    let mainIpToCreate: {
      fullIp: string;
      firstPart: number;
      secondPart: number;
      range: number;
      tail: number;
    } = null;
    let childrenIpAddressesFound: {
      id: number;
    }[] = [];
    let childrenIpAddressesToCreate: {
      fullIp: string;
      firstPart: number;
      secondPart: number;
      range: number;
      tail: number;
    }[] = [];

    //* 1. Buscamos la IP si fue ingresada a mainIpAddress
    if (body.mainIpAddress) {
      const { ipFound, ipToCreate } =
        await this.getIpsToCreateConnect.getSingleIpItem(body.mainIpAddress);

      mainIpAddressFound = ipFound;
      mainIpToCreate = ipToCreate;
    }

    //* 2. Buscamos las IPs si fueron ingresada a childrenIpAddresses
    if (body.childrenIpAddresses?.length) {
      const { ipsFound, ipsToCreate } =
        await this.getIpsToCreateConnect.getMultipleIpItems(
          body.childrenIpAddresses,
        );

      childrenIpAddressesFound = ipsFound;
      childrenIpAddressesToCreate = ipsToCreate;
    }

    //* 3. Creamos la antena
    const {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      childrenIpAddresses,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      mainIpAddress,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      clientId,
      ...toCreateAnthenaBody
    } = body;

    const toCreateAnthena = await this.prismaService.anthena.create({
      data: {
        ...toCreateAnthenaBody,
        ...(clientId && {
          Client: {
            connect: {
              id: clientId,
            },
          },
        }),
        //* En caso de haber ingresado por el BODY un childrenIpAddresses el cual es un array de strings y haber hecho el procedimiento de arriba se verá si se conectan, se crean nuevos o ambos
        ...(body.childrenIpAddresses?.length && {
          childrenIpAddresses: {
            ...(childrenIpAddressesFound?.length && {
              connect: [...childrenIpAddressesFound],
            }),
            ...(childrenIpAddressesToCreate?.length && {
              createMany: {
                data: [...childrenIpAddressesToCreate],
              },
            }),
          },
        }),

        //* En caso de haber ingresado por el BODY un mainIpAddress el cual es un string y haber hecho el procedimiento de arriba se verá si se conecta o se crea uno nuevo
        ...(body.mainIpAddress && {
          mainIpAddress: {
            ...(mainIpAddressFound
              ? {
                  connect: {
                    id: mainIpAddressFound.id,
                  },
                }
              : {
                  create: { ...mainIpToCreate },
                }),
          },
        }),
      },
    });

    return toCreateAnthena;
  }
}
