import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { PrismaOrder } from '../prisma/prisma.cst';

export class QueryDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  limit: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  page: number;

  @IsOptional()
  @IsString()
  orderAttribute?: string;

  @IsOptional()
  @IsEnum(PrismaOrder)
  order?: PrismaOrder;
}
