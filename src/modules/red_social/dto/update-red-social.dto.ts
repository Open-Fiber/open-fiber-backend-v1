// src/modules/red-social/dto/update-red-social.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateRedSocialDto } from './create-red-social.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsUrl, IsOptional } from 'class-validator';

export class UpdateRedSocialDto extends PartialType(CreateRedSocialDto) {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  nombre?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl()
  logoUrl?: string;
}