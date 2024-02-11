import { Module } from '@nestjs/common';
import { PaymentController } from './presentation/controllers/payment.controller';
import { PaymentService } from './presentation/services/payment.service';
import { AwsS3Service } from 'src/shared/aws-s3/aws-s3.service';
import { CreatePaymentUsecase } from './infrastructure/usecases/create-payment.usecase';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [PaymentController],
  providers: [PaymentService, AwsS3Service, CreatePaymentUsecase],
})
export class PaymentModule {}
