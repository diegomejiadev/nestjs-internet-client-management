import {
  Body,
  Controller,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import path from 'path';
import { Public } from 'src/core/decorators/jwt-public.decorator';
import { CreatePaymentDto } from '../../domain/dto/create-payment-dto';
import { PaymentService } from '../services/payment.service';

const ONE_MEGABYTE = 1024 * 1024;
const TWO_MEGABYTES = 2 * ONE_MEGABYTE;
const TEN_MEGABYTES = 10 * ONE_MEGABYTE;

@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Public()
  @Post('generate')
  @UseInterceptors(
    FileFieldsInterceptor([
      {
        name: 'receipts',
      },
    ]),
  )
  generate(
    @UploadedFiles()
    files: {
      receipts: Express.Multer.File[];
    },
    @Body() body: CreatePaymentDto,
  ) {
    return this.paymentService.createPayment(body, files.receipts);
  }
}
