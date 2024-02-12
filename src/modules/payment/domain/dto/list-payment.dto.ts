import { Transform } from 'class-transformer';
import { IsOptional, IsString, IsBoolean, IsDateString } from 'class-validator';
import { QueryDto } from 'src/shared/dto/query.dto';

export enum PaymentOrderAttributeEnum {
  CREATED_AT = 'created_at',
  UPDATED_AT = 'updated_at',
  END_DATE = 'end_date',
  START_DATE = 'start_date',
  CLIENT_NAME = 'client_name',
  CLIENT_LAST_NAME = 'client_last_name',
}

export class ListPaymentDto extends QueryDto {
  @IsOptional()
  @IsDateString()
  @Transform(({ value }) => value as Date, {
    toPlainOnly: true,
  })
  startDate?: Date;

  @IsOptional()
  @IsDateString()
  @Transform(({ value }) => value as Date, {
    toPlainOnly: true,
  })
  endDate?: Date;

  @IsOptional()
  @IsString()
  clientName?: string;

  @IsOptional()
  @IsString()
  clientLastName?: string;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  hasReceipts?: boolean;

  @IsOptional()
  @IsString()
  details?: string;
}
