import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateClientDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  phone: string[];

  @IsOptional()
  @IsString()
  physicalAddress: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  referenceAddresses: string[];

  @IsNotEmpty()
  @IsInt()
  paymentDay: number;
}
