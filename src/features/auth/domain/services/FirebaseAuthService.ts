import { ICredentialsRegister } from "@models/auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "global/configs/firebase";
import { IUser } from "../entities/User";

export const FirebaseAuthService = {
  login: async (email: string, password: string) => {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    if (user.email) {
      return {
        uid: user.uid,
        email: user.email,
      };
    }
  },

  getUser: async (uid: string) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) return docSnap.data();
    return { uid: docSnap.id, ...docSnap.data() };
  },

  register: async (email: string, password: string) => {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return { user };
  },

  createUser: async (userInfo: IUser) => {
    return await setDoc(doc(db, "users", userInfo?.uid!), userInfo);
  },

  logout: async () => {
    await signOut(auth);
  },
};
