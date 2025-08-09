import { IMember } from "../entities/Member";
import { FormDataRegisterMember } from "@features/members/hooks/forms/useFormRegisterMember";

export interface MembersRepository {
  createMember(memberData: FormDataRegisterMember): Promise<void>;
  updateMember(memberData: FormDataRegisterMember): Promise<void>;
  getMembers(): Promise<IMember[]>;
  getMember(id: string): Promise<IMember>;
  deleteMember(member: {
    id: string;
    name: string;
    memberCard: string;
    profileImageUri: string;
  }): Promise<void>;
}
