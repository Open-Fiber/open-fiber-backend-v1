import { PartialType } from '@nestjs/mapped-types';
import { CreatePermisoDTO } from './create-permiso.dto';

export class UpdatePermisoDTO extends PartialType(CreatePermisoDTO) { }
