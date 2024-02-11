import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateClientDto } from '../domain/dto/create-client.dto';

@Injectable()
export class CreateClientUsecase {
  constructor(private prismaService: PrismaService) {}

  async handle(body: CreateClientDto) {
    const { fullName, paymentDay, phone, physicalAddress, referenceAddresses } =
      body;

    const toCreateClient = await this.prismaService.client.create({
      data: {
        full_name: fullName,
        payment_day: paymentDay,
        phone,
        physical_address: physicalAddress,
        reference_addresses: referenceAddresses,
      },
      select: {
        full_name: true,
        id: true,
        payment_day: true,
        phone: true,
        physical_address: true,
        reference_addresses: true,
      },
    });

    return toCreateClient;
  }
}
