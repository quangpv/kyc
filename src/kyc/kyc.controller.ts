import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { SearchKycService } from './search-kyc.service';
import { SearchKycResponse } from './model/search-kyc.response';
import {
  AdvancedSearchKycRequest,
  SearchKycRequest,
} from './model/search-kyc.request';

@ApiTags('KYC')
@Controller('v1/kyc')
export class KycController {
  constructor(readonly searchKycService: SearchKycService) {}

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
}
