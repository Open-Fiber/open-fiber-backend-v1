import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { ProyectoEntity } from './../entities/proyecto.entity';

export class ResponseProyectoDTO {
    @ApiProperty({
        example: '59b956ac-3764-4f02-bd07-92f49dd9b562',
        type: String,
        description: 'ID del proyecto',
    })
    @IsNotEmpty()
    @IsString()
    id: string;

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
    creadorId: string;


    public constructor(proyecto: ProyectoEntity) {
        this.id = proyecto.id;
        this.titulo = proyecto.titulo;
        this.objetivo = proyecto.objetivo;
        this.descripcion = proyecto.descripcion;
        this.creadorId = proyecto.creador.id;
    }
}