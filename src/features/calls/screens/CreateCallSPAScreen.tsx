import { useRoute, RouteProp } from "@react-navigation/native";
import { CreateCallProvider } from "../contexts/CreateCallContext";
import { CallStackParamList } from "../navigation/CallsStack";
import CreateCallScreenContent from "../components/CreateCallScreenContent";

const CreateCallSPAScreen = () => {
  const route = useRoute<RouteProp<CallStackParamList, "CreateCall">>();
  const event = route?.params?.event;

  return (
    <CreateCallProvider>
      <CreateCallScreenContent eventData={event} />
    </CreateCallProvider>
  );
};

export default CreateCallSPAScreen;
