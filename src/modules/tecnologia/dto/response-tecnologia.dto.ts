// src/modules/tecnologia/dto/response-tecnologia.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { TecnologiaEntity } from '../entities/tecnologia.entity';

export class ResponseTecnologiaDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  nombre: string;

  @ApiProperty()
  tipo: string;

  @ApiProperty()
  descripcion: string;

  @ApiProperty({ type: [String], description: 'IDs de las máquinas asociadas' })
  maquinaIds: string[];

  constructor(t: TecnologiaEntity) {
    this.id = t.id;
    this.nombre = t.nombre;
    this.tipo = t.tipo;
    this.descripcion = t.descripcion;
    this.maquinaIds = t.maquinas ? t.maquinas.map(m => m.id) : [];
  }
}