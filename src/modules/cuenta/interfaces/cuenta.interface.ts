import { TIPO_CUENTA } from "src/common/constants/tipoCuenta";

export interface ICuenta {
    id: string;
    email: string;
    password: string;
    tipo: TIPO_CUENTA;
    is_active: boolean;
    is_deleted: boolean;
}
