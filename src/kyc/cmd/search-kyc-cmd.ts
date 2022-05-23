import { Injectable } from '@nestjs/common';
import Fuse from 'fuse.js';
import {
  AdvancedSearchKycRequest,
  SearchKycRequest,
} from '../model/search-kyc.request';
import { EsService } from '../es-service';
import { SearchKycResponse } from '../model/search-kyc.response';
import { ElasticDTO } from '../model/es.dto';
import { ElasticFilterFactory } from '../filter/elastic-filter';
import { KycFactory } from '../model/kyc.factory';
import { KycHistoryEntity } from '../model/kyc-history.entity';
import { SearchTerm } from '../model/get-kyc-history.response';
import { KycHistoryRepo } from '../kyc-history.repo';

@Injectable()
export class SearchKycCmd {
  index = 'onehypernet';
  constructor(
    private esService: EsService,
    private kycFactory: KycFactory,
    private kycHistoryRepo: KycHistoryRepo,
  ) {}

  async search(request: SearchKycRequest): Promise<SearchKycResponse[]> {
    const text = request.q || '';

    const queryFields = [
      'Name',
      'EntityAliases.EntityAlias.Name',
      'EntityAliases.EntityAlias.FirstName',
      'EntityAliases.EntityAlias.LastName',
      'EntityAliases.EntityAlias.MiddleName',
    ];
    const query = {
      index: this.index,
      body: {
        size: 200,
        query: this.createQuery(text, queryFields),
      },
    };
    const { body } = await this.esService.search(query);

    const options = {
      includeScore: true,
      keys: queryFields,
    };
    let data = body.hits.hits.map((s: any) => s._source);
    data = this.filter(data, request);

    const fuse = new Fuse(data, options);
    const result = fuse
      .search(text)
      .map((s: any) => this.kycFactory.create(s.item, s.score));

    await this.kycHistoryRepo.create(this.createEntity(request, result));
    return result;
  }

  private createQuery(text: string, queryFields: string[]) {
    return {
      multi_match: {
        type: 'best_fields',
        query: text,
        fields: queryFields,
      },
    };
  }

  private filter(data: ElasticDTO[], request: SearchKycRequest) {
    const elasticFilter = ElasticFilterFactory.create(request);
    return data.filter((it) => elasticFilter.isAccept(it));
  }

  private createEntity(
    request: SearchKycRequest,
    result: SearchKycResponse[],
  ): KycHistoryEntity {
    const categories = [];
    let maxScore = 0;
    result.forEach((it) => {
      it.categories.forEach((c) => {
        if (!categories.includes(c)) categories.push(c);
      });
      if (maxScore < it.score) maxScore = it.score;
    });
    const term: SearchTerm = {
      countries: [],
      dob: '',
      identifyNumber: '',
      query: request.q,
      matchType: request.match_type,
      entityType: request.entity_type,
    };
    if (request instanceof AdvancedSearchKycRequest) {
      term.countries = request.countries || [];
      term.dob = request.date_of_birth || '';
      term.identifyNumber = request.identify_number || '';
    }
    return {
      categories: JSON.stringify(categories),
      createAt: new Date(),
      entityName: request.entity_type || '',
      score: maxScore,
      searchBy: '',
      searchTerm: JSON.stringify(term),
    };
  }
}
