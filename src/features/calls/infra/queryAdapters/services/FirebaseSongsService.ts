import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db } from "global/configs/firebase";
import { ISongsRepository } from "@features/calls/domain/repositories/ISongsRepository";
import { ISong } from "@features/calls/domain/entities/Songs";

export class FirebaseSongsService implements ISongsRepository {
  async getSongs() {
    const ref = collection(db, "musics");
    const snapshot = await getDocs(ref);
    const songs = snapshot.docs
      .map((doc) => {
        const data = doc.data();
        return { id: doc.id, ...data } as ISong;
      })
      .sort((a, b) => a.music.localeCompare(b.music))
      .filter(Boolean);

    return songs;
  }

  async createSong(data: ISong): Promise<void> {
    await setDoc(doc(db, "musics", data.id), { music: data.music });
  }

  async deleteSong({ id }: { id: string }): Promise<void> {
    await deleteDoc(doc(db, "musics", id));
  }
}
