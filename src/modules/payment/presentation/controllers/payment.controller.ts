import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  Request,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreatePaymentDto } from '../../domain/dto/create-payment-dto';
import { PaymentService } from '../services/payment.service';
import { ExistsPaymentGuard } from '../guards/exists-payment.guard';

const ONE_MEGABYTE = 1024 * 1024;
const TWO_MEGABYTES = 2 * ONE_MEGABYTE;
const TEN_MEGABYTES = 10 * ONE_MEGABYTE;

@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Post('generate')
  @UseInterceptors(
    FileFieldsInterceptor([
      {
        name: 'receipts',
      },
    ]),
  )
  generate(
    @Request() request: Request,
    @UploadedFiles()
    files: {
      receipts: Express.Multer.File[];
    },
    @Body() body: CreatePaymentDto,
  ) {
    const adminId = request['user']['userId'];

    return this.paymentService.createPayment(adminId, body, files.receipts);
  }

  @UseGuards(ExistsPaymentGuard)
  @Patch('upload-receipt/:paymentId')
  @UseInterceptors(
    FileFieldsInterceptor([
      {
        name: 'receipts',
      },
    ]),
  )
  uploadReceipt(
    @Param('paymentId') paymentId: string,
    @UploadedFiles()
    files: {
      receipts: Express.Multer.File[];
    },
  ) {
    return this.paymentService.uploadReceipt(paymentId, files.receipts);
  }
}
