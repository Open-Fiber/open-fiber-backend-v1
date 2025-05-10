import { PartialType } from "@nestjs/mapped-types";
import { CreateOrganizacionDto } from "./createOrganizacion.dto";

export class UpdateOrganizacionDto extends PartialType(CreateOrganizacionDto) { }