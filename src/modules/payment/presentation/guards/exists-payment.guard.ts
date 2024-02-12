import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ExistsPaymentGuard implements CanActivate {
  constructor(private prismaService: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const paymentId = request.params['paymentId'];

    //* 1. Validamos que existe el pago
    const foundPayment = await this.prismaService.payment.findFirst({
      where: {
        id: paymentId,
      },
    });

    if (!foundPayment)
      throw new NotFoundException(
        'No se encontró el Pago con el ID ingresado.',
      );

    return true;
  }
}
