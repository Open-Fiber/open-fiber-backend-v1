import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { UsuarioEntity } from './../entities/usuario.entity';
import { GENERO } from 'src/common/constants/genero';
import { UUID } from 'crypto';

export class UsuarioDto {
    @ApiProperty({
        example: '1ed9e7d7-6a51-4d5d-9ef5-ad33a6fdba9e',
        type: String,
        description: 'ID del usuario',
    })
    @IsNotEmpty()
    @IsString()
    id: string;

    @ApiProperty({
        example: 'John',
        type: String,
        description: 'Nombre del usuario',
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    nombre: string;

    @ApiProperty({
        example: 'Doe',
        type: String,
        description: 'Apellido del usuario',
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    apellido: string;

    @ApiProperty({
        example: 'bolivia',
        type: String,
        description: 'Pais de origen del usuario',
    })
    @IsNotEmpty()
    @IsString()
    pais: string;

    @ApiProperty({
        example: '67303349',
        type: String,
        description: 'Número de celular del usuario',
    })
    @IsOptional()
    @IsString()
    @MinLength(8)
    celular?: string;

    @ApiProperty({
        example: '2024-02-10',
        type: Date,
        description: 'Fecha de Nacimiento del Usuario',
    })
    @IsOptional()
    @IsDate()
    fechaNacimiento?: Date;

    @ApiProperty({
        example: 'https://scontent.fsrz1-1.fna.fbcdn.net/v/t39.30808-6/321514687_828263794936611_9117207435075792485_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=DZ3kknwy0MYQ7kNvgGpd28s&_nc_ht=scontent.fsrz1-1.fna&oh=00_AYDVBsizxPljlSdcHXm_2eM9syvkH1X9sUTlOzLPSBbsNw&oe=667B65BB',
        type: String,
        description: 'URL de la imagen de foto de perfil',
    })
    @IsOptional()
    @IsString()
    fotoUrl?: string;

    @ApiProperty({
        example: '2023-01-01',
        type: Date,
        description: 'Fecha de nacimiento del usuario',
    })
    @IsDate()
    @IsOptional()
    birthdate?: Date;

    @ApiProperty({
        example: GENERO.MASCULINO,
        enum: GENERO,
        description: 'Género del usuario'
    })
    @IsEnum(GENERO)
    sexo: GENERO;

    @ApiProperty({
        example: '1ed9e7d7-6a51-4d5d-9ef5-ad33a6fdba9e',
        type: String,
        description: 'ID de la cuenta del usuario'
    })
    @IsString()
    cuentaId: string;

    public constructor(usuario: UsuarioEntity) {
        this.id = usuario.id;
        this.nombre = usuario.nombre;
        this.apellido = usuario.apellido;
        this.celular = usuario.celular;
        this.fechaNacimiento = usuario.fechaNacimiento;
        this.fotoUrl = usuario.fotoUrl;
        this.pais = usuario.pais;
        this.sexo = usuario.sexo;
        this.cuentaId = usuario.cuenta ? usuario.cuenta.id : null; 
    }
}