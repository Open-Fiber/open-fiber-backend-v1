export interface IAuthToken {
  rol?: string;
  sub: string;
  tipo: string;
  time: number;
  isExpired: boolean;
}