import { ElasticDTO } from './es.dto';
import { Injectable } from '@nestjs/common';
import {
  Enforcement,
  PEP,
  Profile,
  Remarks,
  SearchKycResponse,
  SearchName,
  SearchStatus,
} from './search-kyc.response';
import { ApiProperty } from '@nestjs/swagger';

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
    const association =
      item.EntityCountryAssociations?.EntityCountryAssociation;

    const status: SearchStatus = {
      association: item.EntityTypeDesc,
      category: association?.AdministrativeUnitName || '',
      ownership: association?.OwnershipPercentageCalc || '',
      position: item.EntityPositions?.EntityPosition?.Position || '',
      type: association?.AssociationTypeDesc || '',
    };

    const name: SearchName = {
      firstName: item.FirstName,
      fullName: item.Name,
      lastName: item.LastName,
      middleName: item.MiddleName,
    };
    const alias = item.EntityAliases.EntityAlias;
    const nameAliases = [
      {
        firstName: alias.FirstName,
        fullName: alias.Name,
        lastName: alias.LastName,
        middleName: alias.MiddleName,
      },
    ];

    const enforcementEntity = item.EntityEnforcements?.EntityEnforcement;
    const enforcement: Enforcement = {
      association: enforcementEntity?.AdministrativeUnitName || '',
      category:
        enforcementEntity?.EntityEnforcementSubcategories?.Subcategory
          ?.SubCategoryLabel,
      lastUpdate:
        enforcementEntity?.EntityEnforcementSubcategories?.Subcategory
          ?.LastUpdated,
      source: enforcementEntity?.SourceName || '',
      type: enforcementEntity?.EnforcementDesc || '',
    };
    const dob = item?.EntityDOBs?.EntityDOB?.BirthDate;
    const profile: Profile = {
      dateOfBirth: {
        year: dob?.BirthYear,
        month: dob?.BirthMonth,
        day: dob?.BirthDay,
      },
      gender: item.Gender || '',
      identification:
        item?.EntityIdentifications?.EntityIdentification
          ?.IdentificationNumber || '',
      identificationType:
        item?.EntityIdentifications?.EntityIdentification
          ?.IdentificationTypeDesc || '',
      status: item.IsDeceased !== 0 ? 'Deceased' : 'Alive',
    };

    const remarks = item.EntityRemarks?.EntityRemark?.Remark || '';
    const pepEntity = item.EntitySegments?.EntityPEPs?.EntityPEP;
    const pep: PEP = {
      type: pepEntity?.IsPrimaryPEP,
      status: pepEntity?.IsActivePEP,
      associations: [
        pepEntity?.ISOAdministrativeUnitLevel0,
        pepEntity?.AdministrativeUnitLevel0,
        pepEntity?.AdministrativeUnitLevel1,
        pepEntity?.AdministrativeUnitLevel2,
        pepEntity?.AdministrativeUnitLevel3,
        pepEntity?.AdministrativeUnitLevel4,
      ].filter((it) => it && it.length > 0),
      categories: [
        pepEntity?.EntityPEPSubcategories?.Subcategory?.SubCategoryLabel,
        pepEntity?.EntityPEPSubcategories?.Subcategory?.SubCategoryDesc,
      ].filter((it) => it && it.length > 0),
      governingInstitution: pepEntity?.GoverningInstitution,
      governingRole: pepEntity?.GoverningRole,
      effectiveDate: {
        year: pepEntity?.EffectiveDate?.EffectiveYear,
        month: pepEntity?.EffectiveDate?.EffectiveMonth,
        day: pepEntity?.EffectiveDate?.EffectiveDay,
      },
      expirationDate: {
        year: pepEntity?.ExpirationDate?.ExpirationYear,
        month: pepEntity?.ExpirationDate?.ExpirationMonth,
        day: pepEntity?.ExpirationDate?.ExpirationDay,
      },
    };
    const peps = [pep];
    return {
      score: score,
      categories: categories,
      status: status,
      name: name,
      enforcement: enforcement,
      profile: profile,
      remarks: remarks,
      nameAliases: nameAliases,
      linkedCompanies: undefined,
      peps: peps,
      relationships: [],
      addresses: [],
      sources: [],
    };
  }
}
