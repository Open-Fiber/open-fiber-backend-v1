// src/modules/miembro/dto/update-miembro.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsUUID, IsOptional } from 'class-validator';
import { CreateMiembroDto } from './create-miembro.dto';

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