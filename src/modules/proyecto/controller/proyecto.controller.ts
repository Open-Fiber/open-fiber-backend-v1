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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
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
  async create(@Body() dto: CreateProyectoDto, @GetCuenta() idCuenta: string) {
    const proyectoCreated = await this.proyectoService.create(dto, idCuenta);
    return new ResponseProyectoDTO(proyectoCreated);
  }

  @Get()
  async findAll() {
    const proyectos = await this.proyectoService.findAll();
    return proyectos.map(proyecto => new ResponseProyectoDTO(proyecto))
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return new ResponseProyectoDTO(await this.proyectoService.findOne(id));
  }

  @Get('cuenta/:id')
  async findByCuenta(@Param('id') cuentaId: string) {
    const proyectos = await this.proyectoService.findByCuenta(cuentaId);
    return proyectos.map( proyecto => new ResponseProyectoDTO(proyecto))
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateProyectoDto) {
    return new ResponseProyectoDTO(await this.proyectoService.update(id, dto));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.proyectoService.softDelete(id);
  }
}
