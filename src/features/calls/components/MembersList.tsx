import { FlatList } from "react-native";
import MemberCard from "./MemberCard";
import { useCreateCallContext } from "../contexts/CreateCallContext";
import { IMember } from "@features/members/domain/entities/Member";

const MembersList = () => {
  const { dataList } = useCreateCallContext();

  return (
    <FlatList
      data={dataList as IMember[]}
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
