import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreateProyectoDto {
  @ApiProperty({ example: 'Sistema de gestión de tareas' })
  @IsString()
  titulo: string;

  @ApiProperty({ example: 'Automatizar la organización y seguimiento de tareas' })
  @IsString()
  objetivo: string;

  @ApiProperty({ example: 'Este sistema permitirá gestionar tareas diarias con control de estado y asignación de responsables.' })
  @IsString()
  descripcion: string;

  @ApiProperty({ example: 'b45c3a1e-d04e-4b0e-bc8e-9bb0f0e20b92', description: 'UUID de la cuenta creadora del proyecto' })
  @IsUUID()
  cuentaId: string;
}
