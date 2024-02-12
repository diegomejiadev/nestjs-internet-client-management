import { Body, Controller, OnModuleInit, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { SignInEmailDto } from '../../domain/dto/sign-in-email.dto';
import { Public } from 'src/core/decorators/jwt-public.decorator';
import { SignUpEmailDto } from '../../domain/dto/sign-up-email.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('sign-in-email')
  signInEmail(@Body() body: SignInEmailDto) {
    return this.authService.signInEmail(body);
  }

  @Post('sign-up-email')
  signUpEmail(@Body() body: SignUpEmailDto) {
    return this.authService.signUpEmail(body);
  }
}
