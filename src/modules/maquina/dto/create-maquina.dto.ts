import { IsBoolean, IsString, IsUUID, IsIn, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMaquinaDto {
    @ApiProperty({ example: 'Información detallada de la máquina' })
    @IsString()
    informacion: string;

    @ApiProperty({ example: 'v1.0.0' })
    @IsString()
    version: string;

    @ApiProperty({ example: 'Alto impacto en el rendimiento del sistema' })
    @IsString()
    impacto: string;

    @ApiProperty({ example: 'Ha evolucionado desde el prototipo básico' })
    @IsString()
    evolucion: string;

    @ApiProperty({ enum: ['estetica', 'electronica', 'mecanica', 'codigo', 'original'] })
    @IsIn(['estetica', 'electronica', 'mecanica', 'codigo', 'original'])
    categoria: string;

    @ApiProperty({ example: false })
    @IsBoolean()
    isPrivate: boolean;

    @ApiProperty({ example: 'b3f34e23-91d1-4f3a-9950-13cd15c8a59d' })
    @IsUUID()
    proyectoId: string;

    @ApiProperty({ example: 'UUID opcional de la máquina original', required: false })
    @IsUUID()
    @IsOptional()
    maquinaOriginalId?: string;

}
