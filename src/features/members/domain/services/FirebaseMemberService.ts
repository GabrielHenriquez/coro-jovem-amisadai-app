import * as DB from "firebase/firestore";
import { db, storage } from "global/configs/firebase";
import { IMember } from "../entities/Member";
import { FormDataRegisterMember } from "@features/members/hooks/forms/useFormRegisterMember";
import * as Storage from "firebase/storage";
import { DB_COLLECTIONS } from "global/constants/DB_COLLECTIONS";

export const FirebaseMemberService = {
  createMember: async (memberData: FormDataRegisterMember): Promise<void> => {
    const collectionRef = DB.collection(db, DB_COLLECTIONS.components);
    await DB.addDoc(collectionRef, memberData);
  },

  updateMember: async (
    memberData: FormDataRegisterMember & { id: string }
  ): Promise<void> => {
    await DB.setDoc(
      DB.doc(db, DB_COLLECTIONS.components, memberData.id),
      memberData
    );
  },

  deleteMember: async (member: {
    id: string;
    name: string;
    memberCard: string;
    profileImageUri: string;
  }): Promise<void> => {
    const docRef = DB.doc(db, DB_COLLECTIONS.components, member?.id);
    const imageRef = Storage.ref(
      storage,
      `component-${member?.name}-${member?.memberCard}/profileImage`
    );
    await DB.deleteDoc(docRef);
    if (member?.profileImageUri) await Storage.deleteObject(imageRef);
  },

  getMembers: async (): Promise<IMember[]> => {
    const collectionRef = DB.collection(db, DB_COLLECTIONS.components);
    const q = DB.query(collectionRef, DB.orderBy("name"));

    const querySnapshot = await DB.getDocs(q);

    if (!querySnapshot.empty) {
      const documentsData: IMember[] = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return { id: doc.id, ...data } as IMember;
      });

      return documentsData;
    }

    return [];
  },
  getMember: async (uid: string): Promise<IMember | {}> => {
    const docRef = DB.doc(db, DB_COLLECTIONS.components, uid);
    const docSnap = await DB.getDoc(docRef);
    if (docSnap.exists())
      return { ...docSnap.data(), id: docSnap?.id } as IMember;
    return {};
  },
};
