export class KycHistoryResponse {
  id: number;
  createAt: string;
  entityName: string;
  searchTerm: SearchTerm;
  category: string[];
  score: number;
  searchBy: string;
}

export class SearchTerm {
  query: string;
  matchType: string;
  entityType: string;
  countries: string[];
  dob: string;
  identifyNumber: string;
}

export class Metadata<T> {
  data: T;
  count: number;
}
