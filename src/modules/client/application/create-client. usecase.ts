import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateClientDto } from '../domain/dto/create-client.dto';

@Injectable()
export class CreateClientUsecase {
  constructor(private prismaService: PrismaService) {}

  async handle(body: CreateClientDto) {
    const {
      lastName,
      name,
      paymentDay,
      phone,
      physicalAddress,
      referenceAddresses,
    } = body;

    const toCreateClient = await this.prismaService.client.create({
      data: {
        lastName,
        name: name,
        paymentDay,
        phone,
        physicalAddress,
        referenceAddresses,
      },
      select: {
        lastName: true,
        name: true,
        id: true,
        paymentDay: true,
        phone: true,
        physicalAddress: true,
        referenceAddresses: true,
      },
    });

    return toCreateClient;
  }
}
