import { FlatList } from "react-native";
import MemberCard from "./MemberCard";
import useCreateCallContext from "../contexts/CreateCallContext";

const MembersList = () => {
  const { membersData } = useCreateCallContext();
  console.log("MembersList membersData", membersData);
  return (
    <FlatList
      data={membersData}
      decelerationRate={0.86}
      scrollEventThrottle={16}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ gap: 8, paddingBottom: 5 }}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ index }) => <MemberCard isSelected={false} />}
    />
  );
};

export default MembersList;
