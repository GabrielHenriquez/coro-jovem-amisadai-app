import { FlatList } from "react-native";
import MemberCard from "./MemberCard";
import { useCreateCallContext } from "../contexts/CreateCallContext";

const MembersList = () => {
  const { membersData } = useCreateCallContext();

  return (
    <FlatList
      data={membersData}
      decelerationRate={0.86}
      scrollEventThrottle={16}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ gap: 8, paddingBottom: 5 }}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => <MemberCard item={item} isSelected={false} />}
    />
  );
};

export default MembersList;
