// src/modules/like/dto/response-like.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { LikeEntity } from '../entities/like.entity';

export class ResponseLikeDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  maquinaId: string;

  @ApiProperty()
  cuentaId: string;

  @ApiProperty()
  createdAt: Date; // Incluimos createdAt de BaseEntity

  constructor(l: LikeEntity) {
    this.id = l.id;
    this.maquinaId = l.maquina.id;
    this.cuentaId = l.cuenta.id;
    this.createdAt = l.createdAt;
  }
}