import { Body, Controller, Get, Delete, Param, UseGuards, ParseUUIDPipe, Query, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger/dist';

import { RolesAccess } from '../../../auth/decorators/roles.decorator';
import { AuthGuard, RolesGuard } from '../../../auth/guards/';
import { CreateCuentaDto, CuentaDTO } from '../dto/';
import { CuentaService } from '../services/cuenta.service';
import { QueryDto } from '../../../common/dto/query.dto';
import { ResponseMessage } from '../../../common/interfaces/responseMessage.interface';

@ApiTags('Cuenta')
// @ApiBearerAuth()
// @UseGuards(AuthGuard, RolesGuard)
@Controller('cuenta')
export class CuentaController {
  constructor(private readonly cuentaService: CuentaService) { }

  @Post()
  @ApiOperation({ summary: 'Crear una cuenta' })
  @ApiResponse({ status: 200, description: 'Cuenta creada', type: CuentaDTO })
  async createCuenta(
    @Body() createCuentaDto: CreateCuentaDto,    
  ): Promise<ResponseMessage> {
    return {
      statusCode: 200,
      data: await this.cuentaService.createCuenta(createCuentaDto),
    }
  }

  @ApiQuery({ name: 'limit', type: 'number', required: false })
  @ApiQuery({ name: 'offset', type: 'number', required: false })
  @ApiQuery({ name: 'order', type: 'string', required: false })
  @ApiQuery({ name: 'attr', type: 'string', required: false })
  @ApiQuery({ name: 'value', type: 'string', required: false })
  @Get()
  @ApiOperation({ summary: 'Obtener todas las cuentas' })
  @ApiResponse({ status: 200, description: 'Lista de cuentas', type: [CuentaDTO] })
  public async findAll(@Query() queryDto: QueryDto): Promise<ResponseMessage> {
    return {
      statusCode: 200,
      data: await this.cuentaService.findAll(queryDto),
    };
  }

  @ApiParam({ name: 'id', type: 'string' })
  @Get(':id')
  @ApiOperation({ summary: 'Obtener una cuenta por su id' })
  @ApiResponse({ status: 200, description: 'Cuenta encontrada', type: CuentaDTO })
  public async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseMessage> {
    return {
      statusCode: 200,
      data: await this.cuentaService.findOne(id),
    }
  }

  @ApiParam({ name: 'id', type: 'string' })
  @Post('cambiar-estado/:id')
  @ApiOperation({ summary: 'Activar o desactivar una cuenta por su id' })
  @ApiResponse({ status: 200, description: 'Cambio realizado', example: "{'mensaje': 'cuenta desactivada | cuenta activada'}" })
  public async cambiarEstado(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseMessage> {
    return {
      statusCode: 200,
      data: await this.cuentaService.cambiarEstadoCuenta(id),
    };
  }

  // @RolesAccess('ADMIN')
  @ApiParam({ name: 'id', type: 'string' })
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una cuenta por id' })
  @ApiResponse({ status: 200, description: 'Cuenta eliminada' })
  public async delete(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseMessage> {
    return await this.cuentaService.delete(id);
  }
}
