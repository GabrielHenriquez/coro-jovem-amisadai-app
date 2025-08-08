import { AuthRepository } from "../../domain/repositories/AuthRepository";
import { IUser, IUserAuthResponse } from "../../domain/entities/User";
import { FirebaseAuthService } from "../services/FirebaseAuthService";
import { ICredentialsRegister } from "@models/auth";

export class FirebaseAuthRepository implements AuthRepository {
  async getUser({
    uid,
    email,
  }: {
    uid: string;
    email: string;
  }): Promise<IUser> {
    try {
      const userData = await FirebaseAuthService.getUser(uid);
      return { ...userData, uid, email };
    } catch (error) {
      console.error("❌ Erro ao obter usuário:", error);
      throw new Error("❌ Erro ao obter usuário");
    }
  }

  async login(email: string, password: string): Promise<IUserAuthResponse> {
    try {
      const response = await FirebaseAuthService.login(email, password);
      if (!response || !response.email)
        throw new Error("❌ Erro ao fazer login: usuário não encontrado");
      return response;
    } catch (error: any) {
      console.error("❌ Erro ao fazer login:", error?.message);
      throw new Error("❌ Erro ao fazer login");
    }
  }

  async register(email: string, password: string): Promise<IUserAuthResponse> {
    try {
      const result = await FirebaseAuthService.register(email, password);
      if (!result || !result.user || !result.user.email) {
        throw new Error("❌ Erro ao registrar usuário: dados inválidos");
      }
      return {
        email: result.user.email,
        uid: result.user.uid,
      };
    } catch (error: any) {
      console.error("❌ Erro ao criar conta:", error?.message);
      throw new Error("❌ Erro ao criar conta");
    }
  }

  async createUser(userInfo: IUser): Promise<void> {
    try {
      await FirebaseAuthService.createUser(userInfo);
    } catch (error: any) {
      console.error("❌ Erro ao criar usuário:", error?.message);
      throw new Error("❌ Erro ao criar usuário");
    }
  }

  async logout(): Promise<void> {
    await FirebaseAuthService.logout();
  }
}
