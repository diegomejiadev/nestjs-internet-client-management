import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { AwsS3Service } from 'src/shared/aws-s3/aws-s3.service';

@Injectable()
export class UploadReceiptUsecase {
  constructor(
    private awsS3Service: AwsS3Service,
    private prismaService: PrismaService,
  ) {}

  async handle(paymentId: string, files: Express.Multer.File[]) {
    //* Si no hay archivos lanzamos error
    if (!files)
      throw new BadRequestException(
        'Debe subir al menos una imagen de recibo.',
      );

    const receiptUrls = [];

    //* 1. Subimos los archivos
    const promiseToUploadFiles = files.map((fileItem) =>
      this.awsS3Service.uploadFile(fileItem),
    );

    const uploadedFiles = await Promise.all(promiseToUploadFiles);

    uploadedFiles.map((uploadFileItem) => {
      receiptUrls.push(uploadFileItem.file_url);
    });

    //* 2. Creamos los recibos
    const updatedPayment = await this.prismaService.payment.update({
      where: {
        id: paymentId,
      },
      data: {
        Receipts: {
          createMany: {
            data: [
              ...receiptUrls.map((t) => ({
                fileUrl: t,
              })),
            ],
          },
        },
      },
    });

    return updatedPayment;
  }
}
