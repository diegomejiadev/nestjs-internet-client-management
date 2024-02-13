import { Injectable } from '@nestjs/common';
import { ToggleClientRetiredDto } from '../domain/dto/toggle-retired-client.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ToggleClientRetiredByIdUsecase {
  constructor(private prismaService: PrismaService) {}

  async handle(clientId: string, body: ToggleClientRetiredDto) {
    return await this.prismaService.client.update({
      where: {
        id: clientId,
      },
      data: {
        isRetired: body.retiredValue,
      },
    });
  }
}
