import { ICredentialsRegister } from "@models/auth";
import { IUser, IUserAuthResponse } from "../entities/User";

export interface AuthRepository {
  login(email: string, password: string): Promise<IUserAuthResponse>;
  register(
    email: string,
    password: string,
    name: string
  ): Promise<IUserAuthResponse>;
  getUser({ uid, email }: { uid: string; email: string }): Promise<IUser>;
  logout(): Promise<void>;
  createUser(user: IUser): Promise<void>;
}
