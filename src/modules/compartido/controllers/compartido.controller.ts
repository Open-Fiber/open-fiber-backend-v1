// src/modules/compartido/controllers/compartido.controller.ts
import {
  Controller, Post, Body, Get, Param, Put, Delete, UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CompartidoService } from './../services/compartido.service';
import { CreateCompartidoDto } from './../dto/create-compartido.dto';
import { UpdateCompartidoDto } from './../dto/update-compartido.dto';
import { ResponseCompartidoDto } from './../dto/response-compartido.dto';
import { AuthGuard, PermisoGuard } from './../../../auth/guards';

@ApiBearerAuth()
@ApiTags('Máquinas compartidas')
@UseGuards(AuthGuard, PermisoGuard)
@Controller('compartidos')
export class CompartidoController {
  constructor(private readonly service: CompartidoService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo compartido de máquina a organización' })
  @ApiResponse({ status: 201, type: ResponseCompartidoDto })
  async create(@Body() dto: CreateCompartidoDto) {
    const c = await this.service.create(dto);
    return new ResponseCompartidoDto(c);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los compartidos' })
  @ApiResponse({ status: 200, type: [ResponseCompartidoDto] })
  async findAll() {
    const all = await this.service.findAll();
    return all.map(c => new ResponseCompartidoDto(c));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un compartido por ID' })
  @ApiResponse({ status: 200, type: ResponseCompartidoDto })
  async findOne(@Param('id') id: string) {
    return new ResponseCompartidoDto(await this.service.findOne(id));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un compartido por ID' })
  @ApiResponse({ status: 200, type: ResponseCompartidoDto })
  async update(@Param('id') id: string, @Body() dto: UpdateCompartidoDto) {
    return new ResponseCompartidoDto(await this.service.update(id, dto));
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar (soft delete) un compartido por ID' })
  @ApiResponse({ status: 200, description: 'Compartido eliminado correctamente' })
  async remove(@Param('id') id: string) {
    return this.service.softDelete(id);
  }
}