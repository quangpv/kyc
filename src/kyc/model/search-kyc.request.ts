import { IsArray, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class SearchKycRequest {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  q?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  entity_type?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  match_type?: string;
}

export class AdvancedSearchKycRequest extends SearchKycRequest {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  date_of_birth?: string;

  @IsArray()
  @IsOptional()
  @ApiPropertyOptional()
  countries?: string[];

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  identify_number?: string;
}
