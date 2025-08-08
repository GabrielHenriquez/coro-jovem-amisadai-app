import { IMember } from "../entities/Member";

export interface MembersRepository {
  createMember(): Promise<void>;
  updateMember(): Promise<void>;
  getMembers(): Promise<IMember[]>;
  getMember(id: string): Promise<IMember>;
  deleteMember(member: {
    id: string;
    name: string;
    memberCard: string;
    profileImageUri: string;
  }): Promise<void>;
}
