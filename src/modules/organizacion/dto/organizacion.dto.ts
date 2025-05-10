import { CuentaDTO } from "../../../modules/cuenta/dto/cuenta.dto";
import { OrganizacionEntity } from "../entities/organizacion.entity";

export class OrganizacionDto {
    id: string;
    nombre: string;
    descripcion: string;
    direccion: string;
    pais: string;
    telefono: string;
    pagina_url?: string;
    logo_url?: string;
    cuentaId: string;

    public constructor (organizacion: OrganizacionEntity) {
        this.id = organizacion.id;
        this.nombre = organizacion.nombre;
        this.descripcion = organizacion.descripcion;
        this.direccion = organizacion.direccion;
        this.pais = organizacion.pais;
        this.telefono = organizacion.telefono;
        this.pagina_url = organizacion.pagina_url;
        this.logo_url = organizacion.logo_url;

    }
}