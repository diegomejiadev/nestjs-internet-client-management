import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { TogglePaymentValidityDto } from '../../domain/dto/toggle-payment-validity.dto';

@Injectable()
export class TogglePaymentValidityByIdUsecase {
  constructor(private prismaService: PrismaService) {}

  async handle(paymentId: string, body: TogglePaymentValidityDto) {
    return await this.prismaService.payment.update({
      where: {
        id: paymentId,
      },
      data: {
        isValid: body.validityValue,
      },
    });
  }
}
