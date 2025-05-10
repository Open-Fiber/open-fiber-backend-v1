import { IAuthToken } from "../interfaces/authToken.interface";

export interface ITokenStrategy {
    validate(token: string): Promise<IAuthToken | false>;
  }
  