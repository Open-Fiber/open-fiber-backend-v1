export interface IAuthToken {
  rol?: string;
  permisos?: string[]; 
  sub: string;
  tipo: string;
  time: number;
  isExpired: boolean;
}