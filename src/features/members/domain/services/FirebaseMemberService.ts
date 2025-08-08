import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { db, storage } from "global/configs/firebase";
import { IMember } from "../entities/Member";
import { FormDataRegisterMember } from "@features/members/hooks/forms/useFormRegisterMember";
import { deleteObject, ref } from "firebase/storage";
import { DB_COLLECTIONS } from "@utils/DB_collections";

export const FirebaseMemberService = {
  createMember: async (memberData: FormDataRegisterMember): Promise<void> => {
    const collectionRef = collection(db, DB_COLLECTIONS.components);
    await addDoc(collectionRef, memberData);
  },

  updateMember: async (memberData: FormDataRegisterMember): Promise<void> => {
    await setDoc(doc(db, "components", memberData?.id), memberData);
  },

  deleteMember: async (member: {
    id: string;
    name: string;
    memberCard: string;
    profileImageUri: string;
  }): Promise<void> => {
    console.log(member);
    const docRef = doc(db, DB_COLLECTIONS.components, member?.id);
    const imageRef = ref(
      storage,
      `component-${member?.name}-${member?.memberCard}/profileImage`
    );
    await deleteDoc(docRef);
    if (member?.profileImageUri) await deleteObject(imageRef);
  },

  getMembers: async (): Promise<IMember[]> => {
    const collectionRef = collection(db, DB_COLLECTIONS.components);
    const q = query(collectionRef, orderBy("name"));

    const querySnapshot = await getDocs(q);

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
    const docRef = doc(db, DB_COLLECTIONS.components, uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists())
      return { ...docSnap.data(), id: docSnap?.id } as IMember;
    return {};
  },
};
