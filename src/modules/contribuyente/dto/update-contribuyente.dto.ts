import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateContribuyenteDto } from './create-contribuyente.dto';

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