import { ElasticDTO } from './es.dto';
import { Injectable } from '@nestjs/common';
import { SearchKycResponse } from './search-kyc.response';

@Injectable()
export class KycFactory {
  create(item: ElasticDTO, rawScore: number): SearchKycResponse {
    const score = Math.round((1 - rawScore) * 100000) / 100000;
    const segments = item.EntitySegments as any;
    const categories: string[] = [];

    if (segments.hasOwnProperty('EntityAdverseMedias')) {
      categories.push('Adverse Media');
    }

    if (segments.hasOwnProperty('EntityEnforcements')) {
      categories.push('Enforcement');
    }

    if (segments.hasOwnProperty('EntityPEPs')) {
      categories.push('PEP');
    }

    if (segments.hasOwnProperty('EntitySanctions')) {
      categories.push('Sanctions');
    }

    if (segments.hasOwnProperty('EntitySOEs')) {
      categories.push('SOE');
    }

    return {
      entityName: item.Name,
      entityType: item.EntityTypeDesc,
      categories: categories,
      country: item.EntityAddresses?.EntityAddress?.Country,
      overview: item.EntityPositions?.EntityPosition?.Position || '',
      score: score,
    };
  }
}
