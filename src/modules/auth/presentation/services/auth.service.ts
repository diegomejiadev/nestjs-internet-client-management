import { Injectable } from '@nestjs/common';
import { SignInEmailUsecase } from '../../application/usecases/sign-in-email.usecase';
import { SignInEmailDto } from '../../domain/dto/sign-in-email.dto';
import { SignUpEmailUsecase } from '../../application/usecases/sign-up-email.usecase';
import { SignUpEmailDto } from '../../domain/dto/sign-up-email.dto';
import { IResponse } from 'src/core/interfaces/response.interface';

@Injectable()
export class AuthService {
  constructor(
    private signInEmailUsecase: SignInEmailUsecase,
    private signUpEmailUsecase: SignUpEmailUsecase,
  ) {}

  async signInEmail(body: SignInEmailDto): Promise<{ access_token: string }> {
    return await this.signInEmailUsecase.handle(body);
  }

  async signUpEmail(body: SignUpEmailDto): Promise<IResponse<any>> {
    const data = await this.signUpEmailUsecase.handle(body);

    return {
      data,
    };
  }
}
