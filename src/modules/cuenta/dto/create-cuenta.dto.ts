import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { TIPO_CUENTA } from './../../../common/constants/tipoCuenta';

export class CreateCuentaDto {
  @ApiProperty({
    example: 'john@live.com',
    type: String,
    description: 'Correo electrónico del usuario',
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'P@ssw0rd123',
    type: String,
    description: 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial',
  })
  @IsNotEmpty({ message: 'La contraseña no puede estar vacía' })
  @IsString({ message: 'La contraseña debe ser una cadena de texto' })
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  @MaxLength(32, { message: 'La contraseña no puede tener más de 32 caracteres' })
  // @Matches(/(?=.*[a-z])/, { message: 'La contraseña debe contener al menos una letra minúscula' })
  // @Matches(/(?=.*[A-Z])/, { message: 'La contraseña debe contener al menos una letra mayúscula' })
  // @Matches(/(?=.*\d)/, { message: 'La contraseña debe contener al menos un número' })
  // @Matches(/(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])/, { message: 'La contraseña debe contener al menos un carácter especial' })
  password: string;

  @ApiProperty({
    example: TIPO_CUENTA.USER,
    enum: TIPO_CUENTA,
    description: 'Tipo de Cuenta'
  })
  @IsOptional()
  @IsEnum(TIPO_CUENTA)
  tipo?: TIPO_CUENTA;

  @ApiProperty({
    example: true,
    type: Boolean,
    description: 'Estado de la cuenta'
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

