import { ApiProperty } from '@nestjs/swagger';

export class SearchKycResponse {
  @ApiProperty()
  readonly entityType!: string;

  @ApiProperty()
  readonly entityName!: string;

  @ApiProperty()
  readonly categories!: string[];

  @ApiProperty()
  readonly country!: string;

  @ApiProperty()
  readonly overview!: string;

  @ApiProperty()
  readonly score!: number;
}
