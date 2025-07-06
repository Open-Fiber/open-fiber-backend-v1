// src/modules/compartido/dto/create-compartido.dto.ts
import { IsString, IsUUID, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCompartidoDto {
  @ApiProperty({ example: 'A', description: 'Estado del compartido (e.g., A: Activo, I: Inactivo, P: Pendiente)' })
  @IsString()
  @Length(1, 1)
  estado: string;

  @ApiProperty({ example: 'uuid-de-la-organizacion' })
  @IsUUID()
  organizacionId: string;

  @ApiProperty({ example: 'uuid-de-la-maquina' })
  @IsUUID()
  maquinaId: string;
}