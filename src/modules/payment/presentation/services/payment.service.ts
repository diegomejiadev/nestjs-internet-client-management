import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from '../../domain/dto/create-payment-dto';
import { IResponse } from 'src/core/interfaces/response.interface';
import { CreatePaymentUsecase } from '../../infrastructure/usecases/create-payment.usecase';
import { UploadReceiptUsecase } from '../../infrastructure/usecases/upload-receipt.usecase';

@Injectable()
export class PaymentService {
  constructor(
    private createPaymentUsecase: CreatePaymentUsecase,
    private uploadReceiptUsecase: UploadReceiptUsecase,
  ) {}

  async createPayment(
    adminId: string,
    body: CreatePaymentDto,
    files: Express.Multer.File[],
  ): Promise<IResponse<any>> {
    const data = await this.createPaymentUsecase.handle(adminId, body, files);

    return { data };
  }

  async uploadReceipt(
    paymentId: string,
    files: Express.Multer.File[],
  ): Promise<IResponse<any>> {
    const data = await this.uploadReceiptUsecase.handle(paymentId, files);

    return { data };
  }
}
