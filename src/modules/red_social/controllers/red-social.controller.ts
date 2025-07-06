// src/modules/red-social/controllers/red-social.controller.ts
import {
  Controller, Post, Body, Get, Param, Put, Delete, UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RedSocialService } from '../services/red-social.service';
import { CreateRedSocialDto } from '../dto/create-red-social.dto';
import { UpdateRedSocialDto } from '../dto/update-red-social.dto';
import { ResponseRedSocialDto } from '../dto/response-red-social.dto';
import { AuthGuard, PermisoGuard } from 'src/auth/guards';

@ApiBearerAuth()
@ApiTags('Redes Sociales')
@UseGuards(AuthGuard, PermisoGuard)
@Controller('redes-sociales')
export class RedSocialController {
  constructor(private readonly service: RedSocialService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva Red Social' })
  @ApiResponse({ status: 201, type: ResponseRedSocialDto })
  async create(@Body() dto: CreateRedSocialDto) {
    const rs = await this.service.create(dto);
    return new ResponseRedSocialDto(rs);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas las Redes Sociales' })
  @ApiResponse({ status: 200, type: [ResponseRedSocialDto] })
  async findAll() {
    const all = await this.service.findAll();
    return all.map(rs => new ResponseRedSocialDto(rs));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una Red Social por ID' })
  @ApiResponse({ status: 200, type: ResponseRedSocialDto })
  async findOne(@Param('id') id: string) {
    return new ResponseRedSocialDto(await this.service.findOne(id));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una Red Social por ID' })
  @ApiResponse({ status: 200, type: ResponseRedSocialDto })
  async update(@Param('id') id: string, @Body() dto: UpdateRedSocialDto) {
    return new ResponseRedSocialDto(await this.service.update(id, dto));
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar (soft delete) una Red Social por ID' })
  @ApiResponse({ status: 200, description: 'Red Social eliminada correctamente' })
  async remove(@Param('id') id: string) {
    return this.service.softDelete(id);
  }
}