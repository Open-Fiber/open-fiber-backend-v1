import { ROLES } from '../../common/constants';

export interface IPayload {
  sub: string;
  tipo: string;
  rol?: ROLES;
}
