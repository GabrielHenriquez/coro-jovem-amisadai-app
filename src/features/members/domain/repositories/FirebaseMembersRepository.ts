import { FormDataRegisterMember } from "@features/members/hooks/forms/useFormRegisterMember";
import { IMember } from "../entities/Member";
import { FirebaseMemberService } from "../services/FirebaseMemberService";
import { MembersRepository } from "./MembersRepository";

export class FirebaseMembersRepository implements MembersRepository {
  async createMember(memberData: FormDataRegisterMember): Promise<void> {
    try {
      await FirebaseMemberService.createMember(memberData);
    } catch (error) {
      console.error("❌ Erro ao criar componente:", error);
      throw new Error("❌ Erro ao criar componente:");
    }
  }

  async updateMember(memberData: FormDataRegisterMember): Promise<void> {
    try {
      await FirebaseMemberService.updateMember(memberData);
    } catch (error) {
      console.error("❌ Erro ao atualizar componente:", error);
      throw new Error("❌ Erro ao atualizar componente:");
    }
  }

  async deleteMember(member: {
    id: string;
    name: string;
    memberCard: string;
    profileImageUri: string;
  }): Promise<void> {
    try {
      await FirebaseMemberService.deleteMember(member);
    } catch (error) {
      console.error("❌ Erro ao deletar componente:", error);
      throw new Error("❌ Erro ao deletar componente:");
    }
  }

  async getMember(id: string): Promise<IMember> {
    try {
      const member = await FirebaseMemberService.getMember(id);

      if (!member || typeof member !== "object") {
        throw new Error(`Usuário com id ${id} não encontrado.`);
      }
      return member;
    } catch (error) {
      console.error("❌ Erro ao obter componente:", error);
      throw new Error("❌ Erro ao obter componente");
    }
  }

  async getMembers(): Promise<IMember[]> {
    try {
      const members = await FirebaseMemberService.getMembers();
      return members;
    } catch (error) {
      console.error("❌ Erro ao obter componentes:", error);
      throw new Error("❌ Erro ao obter componentes");
    }
  }
}
