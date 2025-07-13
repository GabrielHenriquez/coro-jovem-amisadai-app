import { FlatList } from "react-native";
import SongCard from "./SongCard";
import useCreateCallContext from "../contexts/CreateCallContext";

const SongsList = () => {
  const { songsData } = useCreateCallContext();
  return (
    <FlatList
      data={songsData}
      renderItem={() => <SongCard />}
      contentContainerStyle={{ gap: 8, paddingBottom: 5 }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={16}
      decelerationRate={0.87}
    />
  );
};

export default SongsList;
