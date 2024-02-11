import { IsNotEmpty, IsString } from 'class-validator';

export class SignInEmailDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
