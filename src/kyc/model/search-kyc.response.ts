import { ApiProperty } from '@nestjs/swagger';

export class SearchKycResponse {
  @ApiProperty()
  name: SearchName;

  @ApiProperty()
  nameAliases: SearchName[];

  @ApiProperty()
  status: SearchStatus;

  @ApiProperty()
  peps: PEP[];

  @ApiProperty()
  remarks: string;

  @ApiProperty()
  profile: Profile;

  @ApiProperty()
  addresses: Address[];

  @ApiProperty()
  enforcement: Enforcement;

  @ApiProperty()
  relationships: Relationship[];

  @ApiProperty()
  linkedCompanies?: Relationship;

  @ApiProperty()
  sources: string[];

  @ApiProperty()
  readonly categories!: string[];

  @ApiProperty()
  score: number;
}

export class SearchName {
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  middleName: string;
  @ApiProperty()
  fullName: string;
}

export class SearchStatus {
  @ApiProperty()
  category: string;

  @ApiProperty()
  association: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  ownership: string;

  @ApiProperty()
  position: string;
}
export class PEP {
  @ApiProperty()
  type: number;

  @ApiProperty()
  status: string;

  @ApiProperty()
  associations: string[];

  @ApiProperty()
  categories: string[];

  @ApiProperty()
  governingInstitution: string;

  @ApiProperty()
  governingRole: string;

  @ApiProperty()
  effectiveDate: SearchDate;

  @ApiProperty()
  expirationDate: SearchDate;
}
export class Remarks {
  @ApiProperty()
  career: string;

  @ApiProperty()
  companyName: string;
}

export class Profile {
  @ApiProperty()
  gender: string;

  @ApiProperty()
  dateOfBirth: SearchDate;

  @ApiProperty()
  status: string;

  @ApiProperty()
  identification: string;

  @ApiProperty()
  identificationType: string;
}

export class Address {
  @ApiProperty()
  type: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  state: string;

  @ApiProperty()
  postalCode: string;

  @ApiProperty()
  country: string;
}
export class Enforcement {
  @ApiProperty()
  type: string;

  @ApiProperty()
  source: string;

  @ApiProperty()
  association: string;

  @ApiProperty()
  category: string;

  @ApiProperty()
  lastUpdate: string;
}
export class Relationship {
  @ApiProperty()
  name: string;

  @ApiProperty()
  association: string;

  @ApiProperty()
  overview: string;
}

export class SearchDate {
  @ApiProperty()
  year: number;
  @ApiProperty()
  month: number;
  @ApiProperty()
  day: number;
}
