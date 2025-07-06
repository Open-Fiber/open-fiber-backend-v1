// src/modules/miembro/dto/update-miembro.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateMiembroDto } from './create-miembro.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsUUID, IsOptional } from 'class-validator';

export class UpdateMiembroDto extends PartialType(CreateMiembroDto) {
  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isActivo?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  usuarioId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  organizacionId?: string;
}