import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { JwtStrategy } from 'src/core/strategies/jwt.strategy';
import { DatabaseModule } from 'src/database/database.module';
import { AuthService } from './presentation/services/auth.service';
import { AuthController } from './presentation/controllers/auth.controller';
import { SignInEmailUsecase } from './application/usecases/sign-in-email.usecase';
import { SignUpEmailUsecase } from './application/usecases/sign-up-email.usecase';

@Module({
  imports: [
    PassportModule,
    DatabaseModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('NESTJS_JWT_SECRET'),
          verifyOptions: {
            ignoreExpiration: false,
          },
          signOptions: {
            expiresIn: configService.get('NESTJS_JWT_EXPIRE_TIME'),
          },
        };
      },
    }),
  ],
  providers: [
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    AuthService,
    SignInEmailUsecase,
    SignUpEmailUsecase,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
