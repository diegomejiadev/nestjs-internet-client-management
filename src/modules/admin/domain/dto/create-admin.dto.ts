import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class CreateAdminDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 30)
  password: string;
}
