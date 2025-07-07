// src/modules/contexto-de-aplicacion/controllers/contexto-de-aplicacion.controller.ts
import {
  Controller, Post, Body, Get, Param, Put, Delete, UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ContextoDeAplicacionService } from './../services/contexto-de-aplicacion.service';
import { CreateContextoDeAplicacionDto } from './../dto/create-contexto-de-aplicacion.dto';
import { UpdateContextoDeAplicacionDto } from './../dto/update-contexto-de-aplicacion.dto';
import { ResponseContextoDeAplicacionDto } from './../dto/response-contexto-de-aplicacion.dto';
import { AuthGuard, PermisoGuard } from './../../../auth/guards';

@ApiBearerAuth()
@ApiTags('Contextos de Aplicación')
@UseGuards(AuthGuard, PermisoGuard)
@Controller('contextos-de-aplicacion')
export class ContextoDeAplicacionController {
  constructor(private readonly service: ContextoDeAplicacionService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo contexto de aplicación' })
  @ApiResponse({ status: 201, type: ResponseContextoDeAplicacionDto })
  async create(@Body() dto: CreateContextoDeAplicacionDto) {
    const c = await this.service.create(dto);
    return new ResponseContextoDeAplicacionDto(c);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los contextos de aplicación' })
  @ApiResponse({ status: 200, type: [ResponseContextoDeAplicacionDto] })
  async findAll() {
    const all = await this.service.findAll();
    return all.map(c => new ResponseContextoDeAplicacionDto(c));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un contexto de aplicación por ID' })
  @ApiResponse({ status: 200, type: ResponseContextoDeAplicacionDto })
  async findOne(@Param('id') id: string) {
    return new ResponseContextoDeAplicacionDto(await this.service.findOne(id));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un contexto de aplicación por ID' })
  @ApiResponse({ status: 200, type: ResponseContextoDeAplicacionDto })
  async update(@Param('id') id: string, @Body() dto: UpdateContextoDeAplicacionDto) {
    return new ResponseContextoDeAplicacionDto(await this.service.update(id, dto));
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar (soft delete) un contexto de aplicación por ID' })
  @ApiResponse({ status: 200, description: 'Eliminado correctamente' })
  async remove(@Param('id') id: string) {
    return this.service.softDelete(id);
  }
}