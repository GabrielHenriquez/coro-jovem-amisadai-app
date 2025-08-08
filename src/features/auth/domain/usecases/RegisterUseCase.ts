import { AuthRepository } from "../repositories/AuthRepository";

export class RegisterUseCase {
  constructor(private authRepo: AuthRepository) {}

  async execute(email: string, password: string, name: string) {
    return await this.authRepo.register(email, password, name);
  }
}
