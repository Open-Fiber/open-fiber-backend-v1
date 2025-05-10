import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString, IsUUID, MaxLength, MinLength, } from 'class-validator';
import { UniqueRole } from '../validations';

export class CreateRolDTO {
    @ApiProperty({
        example: 'Administrador',
        type: String,
        description: 'Nombre del rol',
    })
    @UniqueRole()
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(70)
    nombre: string;

    @ApiProperty({
        example: '["3b7a0100-ce04-41b0-84e6-36c237430188", "8b5a0501-fe04-41b0-84e6-36c237430188"]',
        type: [String],
        description: 'Array de los ids de los permisos',
    })
    @IsNotEmpty()
    @IsString({ each: true })
    @IsArray()
    @IsUUID("4", { each: true })
    permisos: string[];
}
