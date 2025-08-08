export interface ICredentials {
  email: string;
  password: string;
}

export interface ICredentialsRegister {
  uid?: string;
  name: string;
  email: string;
  password: string;
  passwordConfirm?: string;
  phone: string;
  office: string;
}
