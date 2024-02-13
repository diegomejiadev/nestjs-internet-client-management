import { Module } from '@nestjs/common';
import { PaymentController } from './presentation/controllers/payment.controller';
import { PaymentService } from './presentation/services/payment.service';
import { AwsS3Service } from 'src/shared/aws-s3/aws-s3.service';
import { CreatePaymentUsecase } from './infrastructure/usecases/create-payment.usecase';
import { DatabaseModule } from 'src/database/database.module';
import { UploadReceiptUsecase } from './infrastructure/usecases/upload-receipt.usecase';
import { ListPaymentsUsecase } from './infrastructure/usecases/list-payments.usecase';
import { GetPaymentByIdUsecase } from './infrastructure/usecases/get-payment-by-id.usecase';
import { TogglePaymentValidityByIdUsecase } from './infrastructure/usecases/toggle-payment-validity-by-id.usecase';

@Module({
  imports: [DatabaseModule],
  controllers: [PaymentController],
  providers: [
    PaymentService,
    AwsS3Service,
    CreatePaymentUsecase,
    UploadReceiptUsecase,
    ListPaymentsUsecase,
    GetPaymentByIdUsecase,
    TogglePaymentValidityByIdUsecase,
  ],
})
export class PaymentModule {}
