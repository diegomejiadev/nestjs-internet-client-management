import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { getExtremeDatesUtil } from '../../domain/utils/get-extreme-dates.util';

@Injectable()
export class GetPaymentByIdUsecase {
  constructor(private prismaService: PrismaService) {}

  async handle(paymentId: string) {
    const result = await this.prismaService.payment.findFirst({
      where: {
        id: paymentId,
      },
      select: {
        id: true,
        details: true,
        createdAt: true,
        updatedAt: true,
        Client: {
          select: {
            name: true,
            lastName: true,
            id: true,
          },
        },
        SubPayments: {
          select: {
            amount: true,
            id: true,
            startDate: true,
            endDate: true,
            createdAt: true,
          },
        },
        Receipts: {
          select: {
            id: true,
            fileUrl: true,
            createdAt: true,
          },
        },
      },
    });

    if (!result) return null;

    const { maxDate, minDate } = getExtremeDatesUtil(
      result.SubPayments.map((t) => ({
        startDate: t.startDate,
        endDate: t.endDate,
      })),
    );

    const data: typeof result & {
      startDate: Date;
      endDate: Date;
    } = { ...result, startDate: minDate, endDate: maxDate };

    return data;
  }
}
