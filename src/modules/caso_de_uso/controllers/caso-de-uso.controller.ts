// src/modules/caso-de-uso/controllers/caso-de-uso.controller.ts
import {
  Controller, Post, Body, Get, Param, Put, Delete, UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard, PermisoGuard } from './../../../auth/guards';
import { CasoDeUsoService } from './../services/caso-de-uso.service';
import { CreateCasoDeUsoDto } from './../dto/create-caso-de-uso.dto';
import { UpdateCasoDeUsoDto } from './../dto/update-caso-de-uso.dto';
import { ResponseCasoDeUsoDto } from './../dto/response-caso-de-uso.dto';

@ApiBearerAuth()
@ApiTags('Casos de Uso')
@UseGuards(AuthGuard, PermisoGuard)
@Controller('casos-de-uso')
export class CasoDeUsoController {
  constructor(private readonly service: CasoDeUsoService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo caso de uso' })
  @ApiResponse({ status: 201, type: ResponseCasoDeUsoDto })
  async create(@Body() dto: CreateCasoDeUsoDto) {
    const c = await this.service.create(dto);
    return new ResponseCasoDeUsoDto(c);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los casos de uso' })
  @ApiResponse({ status: 200, type: [ResponseCasoDeUsoDto] })
  async findAll() {
    const all = await this.service.findAll();
    return all.map(c => new ResponseCasoDeUsoDto(c));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un caso de uso por ID' })
  @ApiResponse({ status: 200, type: ResponseCasoDeUsoDto })
  async findOne(@Param('id') id: string) {
    return new ResponseCasoDeUsoDto(await this.service.findOne(id));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un caso de uso por ID' })
  @ApiResponse({ status: 200, type: ResponseCasoDeUsoDto })
  async update(@Param('id') id: string, @Body() dto: UpdateCasoDeUsoDto) {
    return new ResponseCasoDeUsoDto(await this.service.update(id, dto));
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar (soft delete) un caso de uso por ID' })
  @ApiResponse({ status: 200, description: 'Eliminado correctamente' })
  async remove(@Param('id') id: string) {
    return this.service.softDelete(id);
  }
}