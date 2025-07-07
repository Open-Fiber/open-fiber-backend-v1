// src/modules/miembro/dto/create-miembro.dto.ts
import { IsBoolean, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMiembroDto {
  @ApiProperty({ example: true, description: 'Indica si el miembro está activo en la organización' })
  @IsBoolean()
  isActivo: boolean;

  @ApiProperty({ example: 'uuid-del-usuario', description: 'ID del usuario asociado a este miembro' })
  @IsUUID()
  usuarioId: string;

  @ApiProperty({ example: 'uuid-de-la-organizacion', description: 'ID de la organización a la que pertenece este miembro' })
  @IsUUID()
  organizacionId: string;
}