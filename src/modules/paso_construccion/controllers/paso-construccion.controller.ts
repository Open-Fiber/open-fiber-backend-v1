// src/modules/paso-construccion/controllers/paso-construccion.controller.ts
import {
  Controller, Post, Body, Get, Param, Put, Delete, UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PasoConstruccionService } from '../services/paso-construccion.service';
import { CreatePasoConstruccionDto } from '../dto/create-paso-construccion.dto';
import { UpdatePasoConstruccionDto } from '../dto/update-paso-construccion.dto';
import { ResponsePasoConstruccionDto } from '../dto/response-paso-construccion.dto';
import { AuthGuard, PermisoGuard } from 'src/auth/guards';

@ApiBearerAuth()
@ApiTags('Pasos de Construcción')
@UseGuards(AuthGuard, PermisoGuard)
@Controller('pasos-construccion')
export class PasoConstruccionController {
  constructor(private readonly service: PasoConstruccionService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo paso de construcción' })
  @ApiResponse({ status: 201, type: ResponsePasoConstruccionDto })
  async create(@Body() dto: CreatePasoConstruccionDto) {
    const p = await this.service.create(dto);
    return new ResponsePasoConstruccionDto(p);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los pasos de construcción' })
  @ApiResponse({ status: 200, type: [ResponsePasoConstruccionDto] })
  async findAll() {
    const all = await this.service.findAll();
    return all.map(p => new ResponsePasoConstruccionDto(p));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un paso de construcción por ID' })
  @ApiResponse({ status: 200, type: ResponsePasoConstruccionDto })
  async findOne(@Param('id') id: string) {
    return new ResponsePasoConstruccionDto(await this.service.findOne(id));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un paso de construcción por ID' })
  @ApiResponse({ status: 200, type: ResponsePasoConstruccionDto })
  async update(@Param('id') id: string, @Body() dto: UpdatePasoConstruccionDto) {
    return new ResponsePasoConstruccionDto(await this.service.update(id, dto));
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar (soft delete) un paso de construcción por ID' })
  @ApiResponse({ status: 200, description: 'Eliminado correctamente' })
  async remove(@Param('id') id: string) {
    return this.service.softDelete(id);
  }
}