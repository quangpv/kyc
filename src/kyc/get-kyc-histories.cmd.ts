import { Injectable } from '@nestjs/common';
import { GetKycHistoryRequest } from './model/get-kyc-history.request';
import { KycHistoryResponse, Metadata } from './model/get-kyc-history.response';
import { KycHistoryRepo } from './KycHistoryRepo';

@Injectable()
export class GetKycHistoriesCmd {
  constructor(private kycHistoryRepo: KycHistoryRepo) {}

  async invoke(
    request: GetKycHistoryRequest,
  ): Promise<Metadata<KycHistoryResponse[]>> {
    const builder = this.kycHistoryRepo.createQueryBuilder('history');
    if (request.date && request.date.length > 0) {
      builder.where("strftime('%d-%m-%Y',history.createAt)=:createAt", {
        createAt: request.date,
      });
    }

    if (request.name && request.name.length > 0) {
      builder.where('history.entityName=:entityName', { entityName: '' });
    }

    if (request.category && request.category.length > 0) {
      builder.where('history.categories like %:category%', { category: '' });
    }
    const selects = await builder.select();
    const count = await selects.getCount();
    const data = await selects.getMany();

    const result = data.map((it) => {
      const response: KycHistoryResponse = {
        category: JSON.parse(it.categories),
        createAt: this.formatDate(it.createAt),
        entityName: it.entityName,
        id: it.id,
        score: it.score,
        searchBy: it.searchBy,
        searchTerm: JSON.parse(it.searchTerm),
      };
      return response;
    });

    return {
      data: result,
      count: count,
    };
  }

  private formatDate(createAt: Date) {
    return `${createAt
      .getDate()
      .toLocaleString('en-US', { minimumIntegerDigits: 2 })}-${(
      createAt.getMonth() + 1
    ).toLocaleString('en-US', {
      minimumIntegerDigits: 2,
    })}-${createAt.getFullYear()}`;
  }
}
