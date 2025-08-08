import { AuthRepository } from "../repositories/AuthRepository";

export class LoginUseCase {
  constructor(private authRepo: AuthRepository) {}

  async execute(email: string, password: string) {
    return await this.authRepo.login(email, password);
  }
}
