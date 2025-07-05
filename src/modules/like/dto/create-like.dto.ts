// src/modules/like/dto/create-like.dto.ts
import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLikeDto {
  @ApiProperty({ example: 'uuid-de-la-maquina' })
  @IsUUID()
  maquinaId: string;

  @ApiProperty({ example: 'uuid-de-la-cuenta' })
  @IsUUID()
  cuentaId: string;
}