export interface IUser {
  name?: string;
  uid: string;
  email: string | null;
  phone?: string;
  office?: string;
}

export interface IUserAuthResponse {
  email: string;
  uid: string;
}
