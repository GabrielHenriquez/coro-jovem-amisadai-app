import { CreateCallProvider } from "../contexts/CreateCallContext";
import CreateCallScreenContent from "../contents/CreateCallScreenContent";

const CreateCallSPAScreen = () => {
  return (
    <CreateCallProvider>
      <CreateCallScreenContent />
    </CreateCallProvider>
  );
};

export default CreateCallSPAScreen;
