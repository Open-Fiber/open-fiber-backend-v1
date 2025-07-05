// src/modules/recurso-clase/dto/update-recurso-clase.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateRecursoClaseDto } from './create-recurso-clase.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsUrl, IsUUID, IsOptional } from 'class-validator';

export class UpdateRecursoClaseDto extends PartialType(CreateRecursoClaseDto) {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  nombreRecurso?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl()
  recursoUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  claseId?: string;
}