export interface ElasticDTO {
  EntityGUID: string;
  EntityTypeDesc: string;
  Gender: string;
  Name: string;
  FirstName: string;
  MiddleName: string;
  LastName: string;
  Prefix: string;
  Suffix: string;
  Title: string;
  IsDeceased: number;
  DeceasedDate: {
    DeceasedYear: string;
    DeceasedMonth: string;
    DeceasedDay: string;
  };
  EntityID: number;
  LookupID: string;
  LastUpdated: string;
  EntityAddresses: {
    EntityAddress: {
      EntityAddressGUID: string;
      AddressTypeDesc: string;
      Address1: string;
      Address2: string;
      City: string;
      StateProvinceRegion: string;
      PostalCode: number;
      Country: string;
      ISOStandard: string;
      LastUpdated: string;
    };
  };
  EntityAliases: {
    EntityAlias: {
      EntityAliasGUID: string;
      AliasTypeDesc: string;
      EnglishDescription: string;
      Name: string;
      FirstName: string;
      MiddleName: string;
      LastName: string;
      Prefix: string;
      Suffix: string;
      LastUpdated: string;
    };
  };
  EntityCountryAssociations: {
    EntityCountryAssociation: {
      EntityCountryAssociationGUID: string;
      AssociationTypeDesc: string;
      AdministrativeUnitName: string;
      ISOStandard: string;
      OwnershipPercentageCalc: string;
      LastUpdated: string;
    };
  };
  EntityDOBs: {
    EntityDOB: {
      EntityDOBGUID: string;
      BirthDate: {
        BirthYear: number;
        BirthMonth: number;
        BirthDay: number;
      };
      LastUpdated: string;
    };
  };
  EntityPositions: {
    EntityPosition: {
      EntityPositionGUID: string;
      Position: string;
      LastUpdated: string;
    };
  };
  EntityRelationships: {
    EntityRelationship: {
      RelatedEntityGUID: string;
      EntityRelationshipGUID: string;
      GroupDesc: string;
      RelationshipDesc: string;
      OwnershipPercentage: string;
      LastUpdated: string;
    };
  };
  EntityRemarks: {
    EntityRemark: {
      EntityRemarkGUID: string;
      Remark: string;
      LastUpdated: string;
    };
  };
  EntitySourceItems: {
    EntitySourceItem: {
      EntitySourceItemGUID: string;
      SourceURI: string;
      LastUpdated: string;
    };
  };
  EntitySegments: {
    EntityPEPs: {
      EntityPEP: {
        EntityPEPGUID: string;
        IsPrimaryPEP: number;
        IsActivePEP: string;
        IsInCountryPEPOnly: string;
        PEPAdminLevelDesc: string;
        ISOAdministrativeUnitLevel0: string;
        AdministrativeUnitLevel0: string;
        AdministrativeUnitLevel1: string;
        AdministrativeUnitLevel2: string;
        AdministrativeUnitLevel3: string;
        AdministrativeUnitLevel4: string;
        GoverningInstitution: string;
        GoverningRole: string;
        EffectiveDate: {
          EffectiveYear: number;
          EffectiveMonth: number;
          EffectiveDay: number;
        };
        EffectiveDateTypeDesc: string;
        ExpirationDate: {
          ExpirationYear: number;
          ExpirationMonth: number;
          ExpirationDay: number;
        };
        ExpirationDateTypeDesc: string;
        LastUpdated: string;
        EntityPEPSubcategories: {
          Subcategory: {
            EntityPEPSubCategoryGUID: string;
            SubCategoryLabel: string;
            SubCategoryDesc: string;
            LastUpdated: string;
          };
        };
      };
    };
    AdditionalSegments: {
      Segment: {
        Record: {
          LastUpdated: string;
          Field: {
            DerivedName: string;
            DerivedValue: string;
          };
        };
      };
    };
  };
}
