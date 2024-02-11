import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from '../../domain/dto/create-payment-dto';
import { IResponse } from 'src/core/interfaces/response.interface';
import { CreatePaymentUsecase } from '../../infrastructure/usecases/create-payment.usecase';

@Injectable()
export class PaymentService {
  constructor(private createPaymentUsecase: CreatePaymentUsecase) {}

  async createPayment(
    body: CreatePaymentDto,
    files: Express.Multer.File[],
  ): Promise<IResponse<any>> {
    const data = await this.createPaymentUsecase.handle(body, files);

    return { data };
  }
}
