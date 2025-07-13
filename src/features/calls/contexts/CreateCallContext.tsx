import { createContext, useContext, useState } from "react";
import { FormProvider } from "react-hook-form";
import { ReactNode } from "react";
import useFormCreateCall from "../hooks/forms/useFormCreateCall";

type CreateCallContextType = {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  membersData: any[];
  setMembersData: React.Dispatch<React.SetStateAction<any[]>>;
  songsData: any[];
  setSongsData: React.Dispatch<React.SetStateAction<any[]>>;
  resetAll: () => void;
};

const CreateCallContext = createContext({} as CreateCallContextType);

export const CreateCallProvider = ({ children }: { children: ReactNode }) => {
  const [step, setStep] = useState(0);
  const [membersData, setMembersData] = useState<any[]>(Array(54).fill(null));
  const [songsData, setSongsData] = useState<any[]>(Array(54).fill(null));
  const formValidator = useFormCreateCall();

  function resetAll() {
    setStep(0);
    formValidator.reset();
  }

  return (
    <CreateCallContext.Provider
      value={{
        step,
        setStep,
        membersData,
        setMembersData,
        songsData,
        setSongsData,
        resetAll,
      }}
    >
      <FormProvider {...formValidator}>{children}</FormProvider>
    </CreateCallContext.Provider>
  );
};

const useCreateCallContext = () => {
  const context = useContext(CreateCallContext);
  return context;
};

export default useCreateCallContext;
