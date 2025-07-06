// src/modules/clase/dto/update-clase.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsUrl, IsUUID, IsOptional } from 'class-validator';
import { CreateClaseDto } from './create-clase.dto';

export class UpdateClaseDto extends PartialType(CreateClaseDto) {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  tituloSeccion?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl()
  urlVideo?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  cursoId?: string;
}