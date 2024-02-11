import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandInput,
} from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';

@Injectable()
export class AwsS3Service {
  private client: S3Client;

  constructor(private configService: ConfigService) {
    this.client = new S3Client({
      region: this.configService.get('NESTJS_AWS_S3_REGION_NAME'),
      credentials: {
        accessKeyId: this.configService.get(
          'NESTJS_AWS_S3_IAM_USER_PUBLIC_KEY',
        ),
        secretAccessKey: this.configService.get(
          'NESTJS_AWS_S3_IAM_USER_SECRET_KEY',
        ),
      },
    });
  }

  async uploadFile(file: Express.Multer.File) {
    try {
      const newFileName = `${crypto.randomUUID()}${path.extname(file.originalname)}`;

      const uploadParams: PutObjectCommandInput = {
        Key: newFileName,
        Bucket: this.configService.get('NESTJS_AWS_S3_BUCKET_NAME'),
        Body: file.buffer,
      };

      const command = new PutObjectCommand(uploadParams);

      await this.client.send(command);

      return {
        file_url: this.getFileUrl(newFileName, file),
      };
    } catch (e) {
      console.log(e);

      throw new InternalServerErrorException(
        'Hubo un error al subir el archivo.',
      );
    }
  }

  getFileUrl(updatedFileName: string, file: Express.Multer.File) {
    const BUCKET_NAME = this.configService.get('NESTJS_AWS_S3_BUCKET_NAME');
    const REGION_NAME = this.configService.get('NESTJS_AWS_S3_REGION_NAME');

    return `https://${BUCKET_NAME}.s3.${REGION_NAME}.amazonaws.com/${updatedFileName}`;
  }
}
