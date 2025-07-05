import { PartialType } from '@nestjs/mapped-types';
import { CreateContribuyenteDto } from './create-contribuyente.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateContribuyenteDto extends PartialType(CreateContribuyenteDto) {
  @ApiPropertyOptional()
  nombreCompleto?: string;

  @ApiPropertyOptional()
  cargo?: string;

  @ApiPropertyOptional()
  fotoUrl?: string;

  @ApiPropertyOptional()
  perfilLinkedin?: string;

  @ApiPropertyOptional()
  maquinaId?: string;
}