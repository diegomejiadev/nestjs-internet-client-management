import { Module } from '@nestjs/common';
import { PaymentModule } from './modules/payment/payment.module';
import { AnthenaModule } from './modules/anthena/anthena.module';
import { UserModule } from './modules/user/user.module';
import { IpModule } from './modules/ip/ip.module';

@Module({
  imports: [UserModule, PaymentModule, AnthenaModule, IpModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
