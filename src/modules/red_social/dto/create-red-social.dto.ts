// src/modules/red-social/dto/create-red-social.dto.ts
import { IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRedSocialDto {
  @ApiProperty({ example: 'Facebook' })
  @IsString()
  nombre: string;

  @ApiProperty({ example: 'https://ejemplo.com/logos/facebook.png' })
  @IsUrl()
  logoUrl: string;
}