import { Module } from '@nestjs/common';
import { PaymentModule } from './modules/payment/payment.module';
import { AnthenaModule } from './modules/anthena/anthena.module';
import { IpModule } from './modules/ip/ip.module';
import { AdminModule } from './modules/admin/admin.module';
import { ClientModule } from './modules/client/client.module';

@Module({
  imports: [PaymentModule, AnthenaModule, IpModule, AdminModule, ClientModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
