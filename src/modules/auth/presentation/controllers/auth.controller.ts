import {
  Body,
  Controller,
  OnModuleInit,
  Patch,
  Post,
  Request,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { SignInEmailDto } from '../../domain/dto/sign-in-email.dto';
import { Public } from 'src/core/decorators/jwt-public.decorator';
import { SignUpEmailDto } from '../../domain/dto/sign-up-email.dto';
import { UpdatePasswordDto } from '../../domain/dto/update-password.dto';

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

  @Patch('me-patch-password')
  updatePassword(@Body() body: UpdatePasswordDto, @Request() request: Request) {
    const adminId = request['user']['userId'];

    return this.authService.updatePassword(adminId, body);
  }
}
