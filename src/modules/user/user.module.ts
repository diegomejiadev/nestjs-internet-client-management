import { Module } from '@nestjs/common';
import { AnthenaModule } from './anthena.module';

@Module({
  imports: [AnthenaModule]
})
export class UserModule {}
