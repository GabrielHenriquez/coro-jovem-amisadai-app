import { MembersRepository } from "../repositories/MembersRepository";

export type MemberType = "getMembers" | "getMember";

export class MembersUseCase {
  constructor(private authRepo: MembersRepository) {}

  async execute(type: MemberType, uid?: string) {
    return type === "getMembers"
      ? await this.authRepo.getMembers()
      : await this.authRepo.getMember(uid!);
  }
}
