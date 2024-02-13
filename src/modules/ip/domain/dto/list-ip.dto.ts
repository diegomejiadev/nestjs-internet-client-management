import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { QueryDto } from 'src/shared/dto/query.dto';

export enum IpOrderAttributeEnum {
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  RANGE = 'range',
  FULL_IP = 'fullIp',
}

export class ListIpDto extends QueryDto {
  @IsOptional()
  @IsString()
  fullIp?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  range?: number;

  @IsOptional()
  @IsString()
  anthenaId?: string; //* Abarca los dos tipos de anthena

  @IsOptional()
  @IsString()
  parentAnthenaId?: string;

  @IsOptional()
  @IsString()
  predecessorAnthenaId?: string;
}
