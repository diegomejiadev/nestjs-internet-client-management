import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreatePaymentDto } from '../../domain/dto/create-payment-dto';
import { PaymentService } from '../services/payment.service';
import { ExistsPaymentGuard } from '../guards/exists-payment.guard';
import { ListPaymentDto } from '../../domain/dto/list-payment.dto';
import { TogglePaymentValidityDto } from '../../domain/dto/toggle-payment-validity.dto';

const ONE_MEGABYTE = 1024 * 1024;
const TWO_MEGABYTES = 2 * ONE_MEGABYTE;
const TEN_MEGABYTES = 10 * ONE_MEGABYTE;

@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Get(':paymentId')
  getById(@Param('paymentId') paymentId: string) {
    return this.paymentService.getPaymentById(paymentId);
  }

  @Get()
  list(@Query() query: ListPaymentDto) {
    return this.paymentService.listPayments(query);
  }

  @Patch('/validity/:paymentId')
  toggleValidityById(
    @Param('paymentId') paymentId: string,
    @Body() body: TogglePaymentValidityDto,
  ) {
    return this.paymentService.togglePaymentValidityById(paymentId, body);
  }

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
