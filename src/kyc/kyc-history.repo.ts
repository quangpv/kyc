import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { KycHistoryEntity } from './model/kyc-history.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class KycHistoryRepo {
  constructor(
    @InjectRepository(KycHistoryEntity)
    private repo: Repository<KycHistoryEntity>,
  ) {}

  create(entity: KycHistoryEntity) {
    return this.repo.save(entity);
  }

  createQueryBuilder(alias: string) {
    return this.repo.createQueryBuilder(alias);
  }

  findAll() {
    return this.repo.find();
  }
}
