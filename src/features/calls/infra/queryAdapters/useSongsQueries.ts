import { useQuery, useMutation } from "@tanstack/react-query";
import { ISong } from "@features/calls/domain/entities/Songs";
import { FirebaseSongsService } from "./services/FirebaseSongsService";

const repository = new FirebaseSongsService();

export const useSongsQueries = () => {
  const getSongsQuery = useQuery({
    queryKey: ["songs"],
    queryFn: () => repository.getSongs(),
  });

  const createSongMutation = useMutation({
    mutationFn: async (data: ISong) => {
      await repository.createSong(data);
    },
  });

  const deleteSongMutation = useMutation({
    mutationFn: async (id: string) => {
      await repository.deleteSong({ id });
    },
  });

  return {
    getSongsQuery,
    createSongMutation,
    deleteSongMutation,
  };
};
