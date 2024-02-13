import { Injectable } from '@nestjs/common';
import { SignInEmailUsecase } from '../../application/usecases/sign-in-email.usecase';
import { SignInEmailDto } from '../../domain/dto/sign-in-email.dto';
import { SignUpEmailUsecase } from '../../application/usecases/sign-up-email.usecase';
import { SignUpEmailDto } from '../../domain/dto/sign-up-email.dto';
import { IResponse } from 'src/core/interfaces/response.interface';
import { UpdatePasswordUsecase } from '../../application/usecases/update-password.usecase';
import { UpdatePasswordDto } from '../../domain/dto/update-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private signInEmailUsecase: SignInEmailUsecase,
    private signUpEmailUsecase: SignUpEmailUsecase,
    private updatePasswordUsecase: UpdatePasswordUsecase,
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

  async updatePassword(
    adminId: string,
    body: UpdatePasswordDto,
  ): Promise<IResponse<any>> {
    const data = await this.updatePasswordUsecase.handle(adminId, body);

    return { data };
  }
}
