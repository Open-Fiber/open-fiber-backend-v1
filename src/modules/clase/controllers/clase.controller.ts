// src/modules/clase/controllers/clase.controller.ts
import {
  Controller, Post, Body, Get, Param, Put, Delete, UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ClaseService } from '../services/clase.service';
import { CreateClaseDto } from '../dto/create-clase.dto';
import { UpdateClaseDto } from '../dto/update-clase.dto';
import { ResponseClaseDto } from '../dto/response-clase.dto';
import { AuthGuard, PermisoGuard } from 'src/auth/guards';

@ApiBearerAuth()
@ApiTags('Clases')
@UseGuards(AuthGuard, PermisoGuard)
@Controller('clases')
export class ClaseController {
  constructor(private readonly service: ClaseService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva clase para un curso' })
  @ApiResponse({ status: 201, type: ResponseClaseDto })
  async create(@Body() dto: CreateClaseDto) {
    const c = await this.service.create(dto);
    return new ResponseClaseDto(c);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas las clases' })
  @ApiResponse({ status: 200, type: [ResponseClaseDto] })
  async findAll() {
    const all = await this.service.findAll();
    return all.map(c => new ResponseClaseDto(c));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una clase por ID' })
  @ApiResponse({ status: 200, type: ResponseClaseDto })
  async findOne(@Param('id') id: string) {
    return new ResponseClaseDto(await this.service.findOne(id));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una clase por ID' })
  @ApiResponse({ status: 200, type: ResponseClaseDto })
  async update(@Param('id') id: string, @Body() dto: UpdateClaseDto) {
    return new ResponseClaseDto(await this.service.update(id, dto));
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar (soft delete) una clase por ID' })
  @ApiResponse({ status: 200, description: 'Clase eliminada correctamente' })
  async remove(@Param('id') id: string) {
    return this.service.softDelete(id);
  }
}