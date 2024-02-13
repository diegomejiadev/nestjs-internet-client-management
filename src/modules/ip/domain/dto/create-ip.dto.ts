import { IsIP, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateIpDto {
  @IsNotEmpty()
  @IsIP('4')
  fullIp: string;

  @IsOptional()
  @IsString()
  predecessorAnthenaId?: string;

  @IsOptional()
  @IsString()
  parentAnthenaId?: string;
}
