import { Module } from '@nestjs/common';
import { KycController } from './kyc.controller';
import { SearchKycCmd } from './cmd/search-kyc-cmd';
import { EsService } from './es-service';
import { HttpModule } from '@nestjs/axios';
import { KycFactory } from './model/kyc.factory';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KycHistoryEntity } from './model/kyc-history.entity';
import { KycHistoryRepo } from './kyc-history.repo';
import { GetKycHistoriesCmd } from './cmd/get-kyc-histories.cmd';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'history.db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([KycHistoryEntity]),
  ],
  controllers: [KycController],
  providers: [
    SearchKycCmd,
    EsService,
    KycFactory,
    KycHistoryRepo,
    GetKycHistoriesCmd,
  ],
  exports: [],
})
export class KycModule {}
