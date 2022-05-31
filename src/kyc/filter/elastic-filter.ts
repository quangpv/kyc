import { ElasticDTO } from '../model/es.dto';
import {
  AdvancedSearchKycRequest,
  SearchKycRequest,
} from '../model/search-kyc.request';

export abstract class ElasticFilter {
  abstract isFilterable(): boolean;
  abstract isAccept(value: ElasticDTO): boolean;
}

class ElasticFilterChain extends ElasticFilter {
  constructor(private filters: ElasticFilter[]) {
    super();
  }

  isFilterable(): boolean {
    return true;
  }

  isAccept(it: ElasticDTO): boolean {
    if (this.filters.length == 0) return true;
    for (const filter of this.filters) {
      if (!filter.isAccept(it)) return false;
    }
    return true;
  }
}

export class ElasticFilterFactory {
  static create(request: SearchKycRequest): ElasticFilter {
    const filters = [
      new EntityTypeFilter(request.entity_type),
      new MatchTypeFilter(request.match_type),
    ];

    if (request instanceof AdvancedSearchKycRequest) {
      filters.push(new CountryFilter(request.countries));
      filters.push(new DateOfBirthFilter(request.date_of_birth));
      filters.push(new IdentityNumberFilter(request.identify_number));
    }

    return new ElasticFilterChain(filters.filter((it) => it.isFilterable()));
  }
}

class EntityTypeFilter extends ElasticFilter {
  constructor(private type?: string) {
    super();
  }

  isAccept(value: ElasticDTO): boolean {
    return value.EntityTypeDesc == this.type;
  }

  isFilterable(): boolean {
    return this.type && this.type.length > 0;
  }
}

class MatchTypeFilter extends ElasticFilter {
  constructor(private type?: string) {
    super();
  }
  isAccept(value: ElasticDTO): boolean {
    return true;
  }

  isFilterable(): boolean {
    return this.type && this.type.length > 0;
  }
}

class CountryFilter extends ElasticFilter {
  private readonly filterableCountries: string[];
  constructor(private countries?: string[]) {
    super();
    this.filterableCountries = countries?.map((it) => it.toLowerCase()) || [];
  }

  isAccept(value: ElasticDTO): boolean {
    const address = value.EntityAddresses.EntityAddress;
    const countryCode = address.ISOStandard.toLowerCase();
    const country = address.Country.toLowerCase();
    for (const filterCountry of this.filterableCountries) {
      if (country.includes(filterCountry) || countryCode == filterCountry)
        return true;
    }
    return false;
  }

  isFilterable(): boolean {
    return this.filterableCountries.length > 0;
  }
}

class IdentityNumberFilter extends ElasticFilter {
  constructor(private identity?: string) {
    super();
  }

  isAccept(value: ElasticDTO): boolean {
    return true;
  }

  isFilterable(): boolean {
    return false;
  }
}

class DateOfBirthFilter extends ElasticFilter {
  private readonly date: number;
  private readonly month: number;
  private readonly year: number;

  constructor(dob: string) {
    super();
    if (!dob || dob.length == 0) return;
    let dmy = dob.split('-');
    if (dmy.length == 0) {
      dmy = dob.split('/');
    }
    if (dmy.length < 3) {
      this.date = 0;
      this.month = 0;
      this.year = 0;
      return;
    }
    [this.date, this.month, this.year] = dmy.map((it) => parseInt(it));
  }

  isAccept(value: ElasticDTO): boolean {
    const dob = value.EntityDOBs?.EntityDOB?.BirthDate;
    return (
      this.date == dob?.BirthDay &&
      this.month == dob?.BirthMonth &&
      this.year == dob?.BirthYear
    );
  }

  isFilterable(): boolean {
    return this.date && this.date != 0;
  }
}
