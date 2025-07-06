import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProyectoService } from './../services/proyecto.service';
import { CreateProyectoDto } from './../dto/create-proyecto.dto';
import { UpdateProyectoDto } from './../dto/update-proyecto.dto';
import { GetCuenta } from './../../../auth/decorators';
import { AuthGuard, PermisoGuard } from './../../../auth/guards';
import { ResponseProyectoDTO } from './../dto/response-proyecto.dto';

@ApiBearerAuth()
@ApiTags('Proyectos')
@UseGuards(AuthGuard, PermisoGuard)
@Controller('proyectos')
export class ProyectoController {
  constructor(private readonly proyectoService: ProyectoService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo proyecto' })
  @ApiResponse({ status: 201, type: ResponseProyectoDTO })
  async create(@Body() dto: CreateProyectoDto, @GetCuenta() idCuenta: string) {
    const proyectoCreated = await this.proyectoService.create(dto, idCuenta);
    return new ResponseProyectoDTO(proyectoCreated);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los proyectos' })
  @ApiResponse({ status: 200, type: [ResponseProyectoDTO] })
  async findAll() {
    const proyectos = await this.proyectoService.findAll();
    return proyectos.map(proyecto => new ResponseProyectoDTO(proyecto))
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un proyecto por ID' })
  @ApiResponse({ status: 200, type: ResponseProyectoDTO })
  async findOne(@Param('id') id: string) {
    return new ResponseProyectoDTO(await this.proyectoService.findOne(id));
  }

  @Get('cuenta/:id')
  @ApiOperation({ summary: 'Listar todos los proyectos de las cuentas' })
  @ApiResponse({ status: 200, type: [ResponseProyectoDTO] })
  async findByCuenta(@Param('id') cuentaId: string) {
    const proyectos = await this.proyectoService.findByCuenta(cuentaId);
    return proyectos.map( proyecto => new ResponseProyectoDTO(proyecto))
  }

  @Put(':id')  
  @ApiOperation({ summary: 'Actualizar un proyecto por ID' })
  @ApiResponse({ status: 200, type: ResponseProyectoDTO })
  async update(@Param('id') id: string, @Body() dto: UpdateProyectoDto) {
    return new ResponseProyectoDTO(await this.proyectoService.update(id, dto));
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar (soft delete) un proyecto por ID' })
  @ApiResponse({ status: 200, description: 'Proyecto eliminado correctamente' })
  remove(@Param('id') id: string) {
    return this.proyectoService.softDelete(id);
  }
}
