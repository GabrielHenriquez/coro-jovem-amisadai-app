import { useFormContext } from "react-hook-form";
import { Button, Text } from "@components/index";
import { ArrowLeft, ArrowRight } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "@styles/colors";
import { View } from "react-native";
import { useCreateCallContext } from "../contexts/CreateCallContext";
import { Log } from "@services/Logger";

const BottomNavigation = () => {
  const formValidator = useFormContext();
  const { step, setStep, onSubmit, setDataForm, isLoading, eventID } =
    useCreateCallContext();
  const insets = useSafeAreaInsets();
  const showBackButton = step > 0;
  const handleNext = formValidator.handleSubmit(
    (data) => {
      if (step >= 2) {
        onSubmit();
      } else {
        if (step === 0) setDataForm(data as any);
        setStep((prev) => prev + 1);
      }
    },
    (errors) => {
      Log.error("Erros de validação:", errors);
    }
  );

  const getLabelButton: Record<number, string> = {
    0: "Próximo",
    1: "Próximo",
    2: eventID ? "Editar chamada" : "Criar chamada",
  };

  return (
    <View
      style={{ bottom: insets.bottom + 20 }}
      className="px-6 gap-3 mt-auto flex-row"
    >
      {showBackButton && (
        <View style={{ flex: 0.15 }}>
          <Button
            bgColor="white"
            styleRest={{
              borderWidth: 2,
              borderColor: colors.primary,
            }}
            onPress={() => setStep((prev) => prev - 1)}
          >
            <ArrowLeft size={26} color={colors.primary} strokeWidth={3} />
          </Button>
        </View>
      )}

      <View style={{ flex: showBackButton ? 0.85 : 1 }}>
        <Button onPress={handleNext} activeLoading={isLoading}>
          <Text size={18} className="font-poppinsSemiBold text-white">
            {getLabelButton[step]}
          </Text>

          {step < 2 && (
            <ArrowRight size={22} color={colors.white} strokeWidth={3} />
          )}
        </Button>
      </View>
    </View>
  );
};

export default BottomNavigation;
