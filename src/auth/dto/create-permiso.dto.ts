import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength, } from 'class-validator';
import { UniquePermission } from '../validations';

export class CreatePermisoDTO {
    @ApiProperty({
        example: 'user.create',
        type: String,
        description: 'Nombre del permiso, solo lo usa el sistema',
    })
    // @UniquePermission()
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(70)
    nombre: string;

    @ApiProperty({
        example: 'Crear Usuarios',
        type: String,
        description: 'Descripcion del permiso, lo que ve el usuario',
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(70)
    descripcion: string;

}
