import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

import { AuthGuard, PermisoGuard } from './../guards';
import { QueryDto } from './../../common/dto/query.dto';
import { ORDER_ENUM } from './../../common/constants';
import { RolService } from './../services/rol.service';
import { CreateRolDTO, UpdateRolDTO } from '../dto';
import { PermisoAccess } from './../decorators/permiso.decorator';
import { PERMISOS } from './../constants/permisos.constant';

@ApiTags('Rol')
@ApiBearerAuth()
@UseGuards(AuthGuard, PermisoGuard)
@Controller('rol')
export class RolController {

  constructor(private readonly rolService: RolService) { }

  @PermisoAccess(PERMISOS.ROL_CREATE)
  @Post()
  async create(@Body() createRolDto: CreateRolDTO): Promise<any> {
    return {
      data: await this.rolService.create(createRolDto)
    }
  }

  // @PermisoAccess(PERMISOS.ROL_READ_All)
  @ApiQuery({ name: 'limit', type: 'number', required: false })
  @ApiQuery({ name: 'offset', type: 'number', required: false })
  @ApiQuery({ name: 'order', enum: ORDER_ENUM, required: false })
  @ApiQuery({ name: 'attr', type: 'string', required: false })
  @ApiQuery({ name: 'value', type: 'string', required: false })
  @Get()
  async findAll(@Query() queryDto: QueryDto): Promise<any> {
    const { data, countData } = await this.rolService.findAll(queryDto);
    return {
      countData, data
    }
  }

  // @PermissionAccess(PERMISSION.ROLE, PERMISSION.ROLE_LIST)
  @ApiParam({ name: 'id', type: 'string' })
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<any> {
    return {
      data: await this.rolService.findOne(id)
    }
  }

  // @PermissionAccess(PERMISSION.ROLE)
  @ApiParam({ name: 'id', type: 'string' })
  @Patch(':id')
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateRoleDto: UpdateRolDTO): Promise<any> {
    return {
      data: await this.rolService.update(id, updateRoleDto)
    }
  }

  // @PermissionAccess(PERMISSION.ROLE)
  @ApiParam({ name: 'id', type: 'string' })
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<any> {
    return this.rolService.remove(id);
  }
}
