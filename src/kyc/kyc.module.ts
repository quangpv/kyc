import { Module } from '@nestjs/common';
import { KycController } from './kyc.controller';
import { SearchKycService } from './search-kyc.service';
import { EsService } from './es-service';
import { HttpModule } from '@nestjs/axios';
import { KycFactory } from './model/kyc.factory';

@Module({
  imports: [HttpModule],
  controllers: [KycController],
  providers: [SearchKycService, EsService, KycFactory],
  exports: [SearchKycService],
})
export class KycModule {}
