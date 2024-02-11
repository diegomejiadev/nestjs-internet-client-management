import { Transform, Type } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePaymentDto {
  @IsOptional()
  @IsString()
  @Type(() => String)
  details?: string;

  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  clientId: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  amount: number;

  @IsNotEmpty()
  @IsDateString()
  @Transform(({ value }) => value as Date, {
    toPlainOnly: true,
  })
  startDate: Date;

  @IsNotEmpty()
  @IsDateString()
  @Transform(({ value }) => value as Date, {
    toPlainOnly: true,
  })
  endDate: Date;
}
