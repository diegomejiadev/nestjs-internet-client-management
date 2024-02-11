import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { SignUpEmailDto } from '../../domain/dto/sign-up-email.dto';
import { hashPassword } from 'src/utils/bcrypt';

@Injectable()
export class SignUpEmailUsecase {
  constructor(private prismaService: PrismaService) {}

  async handle(body: SignUpEmailDto) {
    const { email, password, name } = body;

    //* 1. Verificamos si el admin existe por su email
    const isExistingAdmin = await this.prismaService.admin.findFirst({
      where: {
        email,
      },
    });

    //* 1.1. Si no existe mandamos un error
    if (isExistingAdmin)
      throw new BadRequestException(
        'El correo electrónico ya se encuentra en uso. Intente con uno distinto.',
      );

    //* 2. Hasheamos la contraseña
    const hashedPassword = await hashPassword(password);

    //* 3. Creamos el usuario
    return await this.prismaService.admin.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }
}
