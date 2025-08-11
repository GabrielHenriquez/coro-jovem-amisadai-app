import { ISong } from "../entities/Songs";

export interface ISongsRepository {
  getSongs(): Promise<ISong[]>;
  createSong(data: ISong): Promise<void>;
  deleteSong({ id }: { id: string }): Promise<void>;
}
