import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { SearchKycCmd } from './cmd/search-kyc-cmd';
import { SearchKycResponse } from './model/search-kyc.response';
import {
  AdvancedSearchKycRequest,
  SearchKycRequest,
} from './model/search-kyc.request';
import { GetKycHistoriesCmd } from './cmd/get-kyc-histories.cmd';
import { KycHistoryResponse, Metadata } from './model/get-kyc-history.response';
import { GetKycHistoryRequest } from './model/get-kyc-history.request';

@ApiTags('KYC')
@Controller('v1/kyc')
export class KycController {
  constructor(
    readonly searchKycService: SearchKycCmd,
    readonly getKycHistoriesCmd: GetKycHistoriesCmd,
  ) {}

  @Get('/search')
  @ApiOperation({ summary: 'Search kyc' })
  @ApiOkResponse({ type: SearchKycResponse, isArray: true })
  async search(
    @Query() request: SearchKycRequest,
  ): Promise<SearchKycResponse[]> {
    return await this.searchKycService.search(request);
  }

  @Post('/search')
  @ApiOperation({ summary: 'Advanced search kyc' })
  @ApiOkResponse({ type: SearchKycResponse, isArray: true })
  async advancedSearch(
    @Body(new ValidationPipe({ transform: true }))
    request: AdvancedSearchKycRequest,
  ): Promise<SearchKycResponse[]> {
    return await this.searchKycService.search(request);
  }

  @Get('/history')
  @ApiOperation({ summary: 'kyc search history' })
  @ApiOkResponse({ type: KycHistoryResponse, isArray: true })
  async getHistories(
    @Query() request: GetKycHistoryRequest,
  ): Promise<Metadata<KycHistoryResponse[]>> {
    return await this.getKycHistoriesCmd.invoke(request);
  }
}
