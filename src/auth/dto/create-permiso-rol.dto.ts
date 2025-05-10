import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, MaxLength, MinLength, } from 'class-validator';
// import { UniqueRole } from '../../common/validations/unique.validation';

export class CreatePermisoRolDto {
    @ApiProperty({
        example: '3b7a0100-ce04-41b0-84e6-36c237430188',
        type: String,
        description: 'Id del permiso',
    })
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    permiso: string;

    @ApiProperty({
        example: '3b7a0100-ce04-41b0-84e6-36c237430188',
        type: String,
        description: 'Id del rol',
    })
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    rol: string;
}
