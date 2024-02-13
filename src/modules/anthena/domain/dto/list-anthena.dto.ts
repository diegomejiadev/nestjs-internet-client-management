import { Transform } from 'class-transformer';
import { IsOptional, IsString, IsDateString, IsBoolean } from 'class-validator';
import { QueryDto } from 'src/shared/dto/query.dto';

export enum AnthenaOrderAttributeEnum {
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  ALIAS = 'alias',
  NAME = 'name',
}

export class ListAnthenaDto extends QueryDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  alias?: string;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  hasAlias?: boolean;

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
  clientId?: string;

  @IsOptional()
  @IsString()
  clientName?: string;

  @IsOptional()
  @IsString()
  clientLastName?: string;

  @IsOptional()
  @IsString()
  ipAddress?: string;
}
