import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { createIpBody } from 'src/modules/ip/domain/utils/create-ip-body';

@Injectable()
export class GetIpsToCreateConnectUtils {
  constructor(private prismaService: PrismaService) {}

  async getSingleIpItem(bodyIpAddress: string) {
    let ipFound: { id: number } = null;
    let ipToCreate: {
      fullIp: string;
      firstPart: number;
      secondPart: number;
      range: number;
      tail: number;
    } = null;

    const foundIpAddress = await this.prismaService.ipAdress.findFirst({
      where: {
        fullIp: {
          equals: bodyIpAddress.trim(),
        },
      },
      select: {
        id: true,
        fullIp: true,
      },
    });

    if (foundIpAddress) {
      ipFound = foundIpAddress;
    } else {
      ipToCreate = createIpBody(bodyIpAddress);
    }

    return { ipFound, ipToCreate };
  }

  async getMultipleIpItems(bodyIpAddresses: string[]) {
    let ipsFound: {
      id: number;
    }[] = [];
    let ipsToCreate: {
      fullIp: string;
      firstPart: number;
      secondPart: number;
      range: number;
      tail: number;
    }[] = [];

    const foundIpAddresses = await this.prismaService.ipAdress.findMany({
      select: {
        id: true,
        fullIp: true,
      },
      where: {
        OR: [
          ...bodyIpAddresses.map((t) => ({
            fullIp: {
              equals: t.trim(),
            },
          })),
        ],
      },
    });

    ipsFound = foundIpAddresses.map((ip) => ({ id: ip.id }));

    if (foundIpAddresses.length) {
      ipsToCreate = bodyIpAddresses
        .filter((childrenIpString) => {
          return !foundIpAddresses.some((foundIpAddressItem) => {
            return foundIpAddressItem.fullIp == childrenIpString;
          });
        })
        .map((ipItem) => createIpBody(ipItem));
    } else {
      ipsToCreate = bodyIpAddresses.map((childrenItem) =>
        createIpBody(childrenItem),
      );
    }

    return { ipsFound, ipsToCreate };
  }
}
