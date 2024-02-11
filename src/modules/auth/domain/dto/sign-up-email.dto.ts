import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class SignUpEmailDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 30)
  password: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}
