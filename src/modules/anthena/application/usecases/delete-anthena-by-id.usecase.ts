import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class DeleteAnthenaByIdUsecase {
  constructor(private prismaService: PrismaService) {}

  async handle(anthenaId: string): Promise<boolean> {
    const data = await this.prismaService.anthena.delete({
      where: {
        id: anthenaId,
      },
    });

    return true;
  }
}
