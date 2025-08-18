import React from "react";
import * as RN from "react-native";
import { Button, Text } from "@components/index";
import { Log } from "@services/Logger";

interface MissingComponentsPdfButtonProps {
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
}

const MissingComponentsPdfButton: React.FC<MissingComponentsPdfButtonProps> = ({
  onPress,
  loading = false,
  disabled = false,
}) => {
  const handlePress = () => {
    if (loading || disabled) return;

    try {
      Log.info("Gerando PDF de componentes faltosos...");
      onPress();
    } catch (error) {
      Log.error("Erro ao gerar PDF:", error);
    }
  };

  const getButtonText = () => {
    if (loading) return "Gerando PDF...";
    return "Gerar PDF - Componentes Mais Faltosos";
  };

  return (
    <RN.View style={{ paddingHorizontal: 16, marginBottom: 16 }}>
      <Button
        onPress={handlePress}
        disabled={disabled || loading}
        activeLoading={loading}
        className="bg-primary"
      >
        <Text>{getButtonText()}</Text>
      </Button>
    </RN.View>
  );
};

export default MissingComponentsPdfButton;
