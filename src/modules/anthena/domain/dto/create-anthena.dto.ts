import {
  IsArray,
  IsIP,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAnthenaDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  alias: string;

  @IsOptional()
  @IsString()
  clientId?: string;

  @IsOptional()
  @IsIP('4')
  mainIpAddress?: string;

  @IsOptional()
  @IsArray()
  @IsIP('4', { each: true })
  childrenIpAddresses?: string[];
}
