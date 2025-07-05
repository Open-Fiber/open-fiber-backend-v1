// src/modules/comentario/dto/create-comentario.dto.ts
import { IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateComentarioDto {
  @ApiProperty({ example: '¡Excelente explicación en esta clase!' })
  @IsString()
  mensaje: string;

  @ApiProperty({ example: 'uuid-de-la-cuenta' })
  @IsUUID()
  cuentaId: string; // ID de la cuenta que hace el comentario

  @ApiProperty({ example: 'uuid-de-la-clase' })
  @IsUUID()
  claseId: string; // ID de la clase a la que pertenece el comentario
}