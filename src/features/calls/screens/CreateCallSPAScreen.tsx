import { CreateCallProvider } from "../contexts/CreateCallContext";
import CreateCallScreenContent from "../contents/CreateCallScreenContent";
import { useRoute } from "@react-navigation/native";

const CreateCallSPAScreen = () => {
  const route = useRoute();
  const event = route?.params?.event;

  return (
    <CreateCallProvider>
      <CreateCallScreenContent eventData={event} />
    </CreateCallProvider>
  );
};

export default CreateCallSPAScreen;
