import * as SecureStore from "expo-secure-store";
import { IUser, IUserAuthResponse } from "../domain/entities/User";

export const secureStorage = {
  saveAuth: async (user: IUser) => {
    await SecureStore.setItemAsync("auth", JSON.stringify(user));
  },
  getAuth: async (): Promise<IUserAuthResponse | null> => {
    const data = await SecureStore.getItemAsync("auth");
    return data ? JSON.parse(data) : null;
  },
  clear: async () => {
    await SecureStore.deleteItemAsync("auth");
  },
};
