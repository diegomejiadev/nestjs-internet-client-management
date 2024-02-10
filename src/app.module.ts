import { Module } from '@nestjs/common';
import { PaymentModule } from './modules/payment/payment.module';
import { AnthenaModule } from './modules/anthena/anthena.module';
import { IpModule } from './modules/ip/ip.module';
import { AdminModule } from './modules/admin/admin.module';
import { ClientModule } from './modules/client/client.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { validate } from './core/env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`],
      validate,
    }),
    PaymentModule,
    AnthenaModule,
    IpModule,
    AdminModule,
    ClientModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
