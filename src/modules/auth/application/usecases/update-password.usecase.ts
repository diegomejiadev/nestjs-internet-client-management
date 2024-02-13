import { ForbiddenException, Injectable } from '@nestjs/common';
import { UpdatePasswordDto } from '../../domain/dto/update-password.dto';
import { PrismaService } from 'src/database/prisma.service';
import { comparePassword, hashPassword } from 'src/utils/bcrypt';

@Injectable()
export class UpdatePasswordUsecase {
  constructor(private prismaService: PrismaService) {}

  async handle(adminId: string, body: UpdatePasswordDto) {
    const foundAdmin = await this.prismaService.admin.findFirst({
      where: {
        id: adminId,
      },
      select: {
        id: true,
        password: true,
      },
    });

    const hasSamePassword = await comparePassword(
      body.oldPassword,
      foundAdmin.password,
    );

    if (!hasSamePassword)
      throw new ForbiddenException(
        'Las contraseñas no coinciden. Inténtelo nuevamente.',
      );

    const hashedPassword = await hashPassword(body.newPassword);

    return await this.prismaService.admin.update({
      where: {
        id: adminId,
      },
      data: {
        password: hashedPassword,
      },
    });
  }
}
