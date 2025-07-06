// src/modules/red-social/dto/response-red-social.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { RedSocialEntity } from '../entities/red-social.entity';

export class ResponseRedSocialDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  nombre: string;

  @ApiProperty()
  logoUrl: string;

  constructor(rs: RedSocialEntity) {
    this.id = rs.id;
    this.nombre = rs.nombre;
    this.logoUrl = rs.logoUrl;
  }
}