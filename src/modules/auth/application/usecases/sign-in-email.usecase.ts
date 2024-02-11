import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { SignInEmailDto } from '../../domain/dto/sign-in-email.dto';
import { comparePassword } from 'src/utils/bcrypt';
import { IPayload } from 'src/core/interfaces/payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SignInEmailUsecase {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async handle(body: SignInEmailDto): Promise<{ access_token: string }> {
    const { email, password } = body;

    //* 1. Buscamos el usuario por su email
    const isExistingAdmin = await this.prismaService.admin.findFirst({
      where: {
        email,
      },
      select: {
        id: true,
        name: true,
        password: true,
      },
    });

    //* 1.1. Si no existe mandamos un error
    if (!isExistingAdmin)
      throw new BadRequestException(
        'El correo y/o contraseña son incorrectos.',
      );

    //* 2. Verificamos si las contraseñas coinciden
    const areSamePassword = await comparePassword(
      password,
      isExistingAdmin.password,
    );

    //* 2.1. Si la contraseña no coincide lanza error
    if (!areSamePassword)
      throw new BadRequestException(
        'El correo y/o contraseña son incorrectos.',
      );

    //* 3. Formamos el payload
    const payload: IPayload = {
      name: isExistingAdmin.name,
      sub: isExistingAdmin.id,
    };

    //* 4. Signeamos el payload y lo retornamos
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
