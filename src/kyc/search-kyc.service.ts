import { Injectable } from '@nestjs/common';
import Fuse from 'fuse.js';
import { SearchKycRequest } from './model/search-kyc.request';
import { EsService } from './es-service';
import { SearchKycResponse } from './model/search-kyc.response';
import { ElasticDTO } from './model/es.dto';
import { ElasticFilterFactory } from './filter/elastic-filter';
import { KycFactory } from './model/kyc.factory';

@Injectable()
export class SearchKycService {
  index = 'onehypernet';
  constructor(private esService: EsService, private kycFactory: KycFactory) {}

  async search(request: SearchKycRequest): Promise<SearchKycResponse[]> {
    const text = request.q || '';

    const queryFields = ['Name', 'EntityAliases.EntityAlias.Name'];
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
    return fuse
      .search(text)
      .map((s: any) => this.kycFactory.create(s.item, s.score));
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
}
