import { IsString, IsUrl, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContribuyenteDto {
  @ApiProperty({ example: 'María López' })
  @IsString()
  nombreCompleto: string;

  @ApiProperty({ example: 'Ingeniera de Software' })
  @IsString()
  cargo: string;

  @ApiProperty({ example: 'https://miweb.com/foto.jpg' })
  @IsUrl()
  fotoUrl: string;

  @ApiProperty({ example: 'https://linkedin.com/in/marialopez' })
  @IsUrl()
  perfilLinkedin: string;

  @ApiProperty({ example: 'uuid-de-la-maquina' })
  @IsUUID()
  maquinaId: string;
}
