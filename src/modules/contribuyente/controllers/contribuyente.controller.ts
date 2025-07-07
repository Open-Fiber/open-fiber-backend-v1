import {
  Controller, Post, Body, Get, Param, Put, Delete, UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ContribuyenteService } from './../services/contribuyente.service';
import { CreateContribuyenteDto } from './../dto/create-contribuyente.dto';
import { UpdateContribuyenteDto } from './../dto/update-contribuyente.dto';
import { ResponseContribuyenteDto } from './../dto/response-contribuyente.dto';
import { AuthGuard, PermisoGuard } from './../../../auth/guards';

@ApiBearerAuth()
@ApiTags('Contribuyentes')
@UseGuards(AuthGuard, PermisoGuard)
@Controller('contribuyentes')
export class ContribuyenteController {
  constructor(private readonly service: ContribuyenteService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo contribuyente' })
  @ApiResponse({ status: 201, type: ResponseContribuyenteDto })
  async create(@Body() dto: CreateContribuyenteDto) {
    const c = await this.service.create(dto);
    return new ResponseContribuyenteDto(c);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los contribuyentes' })
  @ApiResponse({ status: 200, type: [ResponseContribuyenteDto] })
  async findAll() {
    const all = await this.service.findAll();
    return all.map(c => new ResponseContribuyenteDto(c));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un contribuyente por ID' })
  @ApiResponse({ status: 200, type: ResponseContribuyenteDto })
  async findOne(@Param('id') id: string) {
    return new ResponseContribuyenteDto(await this.service.findOne(id));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un contribuyente por ID' })
  @ApiResponse({ status: 200, type: ResponseContribuyenteDto })
  async update(@Param('id') id: string, @Body() dto: UpdateContribuyenteDto) {
    return new ResponseContribuyenteDto(await this.service.update(id, dto));
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar (soft delete) un contribuyente por ID' })
  @ApiResponse({ status: 200, description: 'Eliminado correctamente' })
  async remove(@Param('id') id: string) {
    return this.service.softDelete(id);
  }
}