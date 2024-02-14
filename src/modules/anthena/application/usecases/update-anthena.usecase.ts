import { Injectable } from '@nestjs/common';
import { UpdateAnthenaDto } from '../../domain/dto/update-anthena.dto';
import { PrismaService } from 'src/database/prisma.service';
import { GetIpsToCreateConnectUtils } from 'src/modules/ip/application/utils/get-ips-to-create-connect';

@Injectable()
export class UpdateAnthenaUsecase {
  constructor(
    private prismaService: PrismaService,
    private getIpsToCreateConnect: GetIpsToCreateConnectUtils,
  ) {}

  async handle(anthenaId: string, body: UpdateAnthenaDto) {
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

    //* 3. Alistamos un objeto para desconectarlo si es necesario
    const foundAnthena = await this.prismaService.anthena.findFirst({
      where: {
        id: anthenaId,
      },
      select: {
        childrenIpAddresses: {
          select: {
            id: true,
          },
        },
      },
    });

    const {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      childrenIpAddresses,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      mainIpAddress,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      clientId,
      ...toCreateAnthenaBody
    } = body;

    //* 4. Actualizamos la antena
    //! 4.1. Si es que se ha ingresado BODY.childrenIpAddresses debemos desconectar todos
    if (typeof body?.childrenIpAddresses != 'undefined') {
      await this.prismaService.anthena.update({
        where: {
          id: anthenaId,
        },
        data: {
          childrenIpAddresses: {
            disconnect: [
              ...foundAnthena.childrenIpAddresses.map((ipItem) => ({
                id: ipItem.id,
              })),
            ],
          },
        },
      });
    }

    //* 4.2 Ahora si actualizamos
    return await this.prismaService.anthena.update({
      select: {
        id: true,
        alias: true,
        clientId: true,
        mainIpAdressId: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        childrenIpAddresses: {
          select: {
            id: true,
            fullIp: true,
          },
        },
        Client: {
          select: {
            id: true,
            name: true,
            lastName: true,
          },
        },
        mainIpAddress: {
          select: {
            id: true,
            fullIp: true,
          },
        },
      },
      where: {
        id: anthenaId,
      },
      data: {
        ...toCreateAnthenaBody,
        ...(typeof body?.clientId != 'undefined' && {
          Client: {
            ...(body.clientId
              ? {
                  connect: {
                    id: body.clientId,
                  },
                }
              : {
                  disconnect: {},
                }),
          },
        }),
        //* En caso de haber ingresado por el BODY un mainIpAddress el cual es un string y haber hecho el procedimiento de arriba se verá si se conecta o se crea uno nuevo
        ...(typeof body?.mainIpAddress != 'undefined' && {
          ...(body.mainIpAddress
            ? {
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
              }
            : //* Si el BODY.mainIpAddress que se ingresó directamente es un NULL se desconecta la relacion que tiene con el ip asignado actualmente, esto podemos verlo más facilmente en la relacion superior con Client
              {
                mainIpAddress: {
                  disconnect: {},
                },
              }),
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
      },
    });
  }
}
