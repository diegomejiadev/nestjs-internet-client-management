import { Injectable } from '@nestjs/common';
import { UpdateClientDto } from '../domain/dto/update-client.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UpdateClientUsecase {
  constructor(private prismaService: PrismaService) {}

  async handle(clientId: string, body: UpdateClientDto) {
    return await this.prismaService.client.update({
      where: {
        id: clientId,
      },
      data: { ...body },
    });
  }
}
