import { Module } from '@nestjs/common';
import { KycModule } from './kyc/kyc.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [KycModule, ConfigModule.forRoot()],
})
export class AppModule {}
