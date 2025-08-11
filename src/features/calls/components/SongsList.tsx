import { FlatList } from "react-native";
import SongCard from "./SongCard";
import { useCreateCallContext } from "../contexts/CreateCallContext";
import { ISong } from "../domain/entities/Songs";

const SongsList = () => {
  const { dataList } = useCreateCallContext();

  return (
    <FlatList
      data={dataList as unknown as ISong[]}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <SongCard item={item} />}
      contentContainerStyle={{ gap: 8, paddingBottom: 5 }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={16}
      decelerationRate={0.87}
    />
  );
};

export default SongsList;
