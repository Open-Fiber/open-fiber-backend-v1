// src/modules/hito/controllers/hito.controller.ts
import {
  Controller, Post, Body, Get, Param, Put, Delete, UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HitoService } from './../services/hito.service';
import { CreateHitoDto } from './../dto/create-hito.dto';
import { UpdateHitoDto } from './../dto/update-hito.dto';
import { ResponseHitoDto } from './../dto/response-hito.dto';
import { AuthGuard, PermisoGuard } from './../../../auth/guards';

@ApiBearerAuth()
@ApiTags('Hitos')
@UseGuards(AuthGuard, PermisoGuard)
@Controller('hitos')
export class HitoController {
  constructor(private readonly service: HitoService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo hito' })
  @ApiResponse({ status: 201, type: ResponseHitoDto })
  async create(@Body() dto: CreateHitoDto) {
    const h = await this.service.create(dto);
    return new ResponseHitoDto(h);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los hitos' })
  @ApiResponse({ status: 200, type: [ResponseHitoDto] })
  async findAll() {
    const all = await this.service.findAll();
    return all.map(h => new ResponseHitoDto(h));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un hito por ID' })
  @ApiResponse({ status: 200, type: ResponseHitoDto })
  async findOne(@Param('id') id: string) {
    return new ResponseHitoDto(await this.service.findOne(id));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un hito por ID' })
  @ApiResponse({ status: 200, type: ResponseHitoDto })
  async update(@Param('id') id: string, @Body() dto: UpdateHitoDto) {
    return new ResponseHitoDto(await this.service.update(id, dto));
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar (soft delete) un hito por ID' })
  @ApiResponse({ status: 200, description: 'Eliminado correctamente' })
  async remove(@Param('id') id: string) {
    return this.service.softDelete(id);
  }
}