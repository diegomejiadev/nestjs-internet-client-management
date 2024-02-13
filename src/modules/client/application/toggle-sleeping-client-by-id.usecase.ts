import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { ToggleClientSleepingDto } from '../domain/dto/toggle-sleeping-client.dto';

@Injectable()
export class ToggleClientSleepingByIdUsecase {
  constructor(private prismaService: PrismaService) {}

  async handle(clientId: string, body: ToggleClientSleepingDto) {
    return await this.prismaService.client.update({
      where: {
        id: clientId,
      },
      data: {
        isSleeping: body.sleepingValue,
      },
    });
  }
}
