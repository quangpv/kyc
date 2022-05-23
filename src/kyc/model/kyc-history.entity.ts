import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class KycHistoryEntity {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column()
  createAt: Date;
  @Column()
  entityName: string;
  @Column()
  searchTerm: string;
  @Column()
  categories: string;
  @Column()
  score: number;
  @Column()
  searchBy: string;
}
