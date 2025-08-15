import React from "react";
import { Button, Modal, Text } from "@components/index";
import getHeight from "@utils/getHeight";

interface DeleteConfirmationModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  visible,
  onClose,
  onConfirm,
  isLoading,
}) => (
  <Modal.Root>
    <Modal.Content visible={visible}>
      <Modal.AreaCloseModal onClose={onClose} />
      <Modal.Title>Tem certeza que deseja excluir?</Modal.Title>
      <Modal.Subtitle>Essa ação não pode ser desfeita.</Modal.Subtitle>
      <Button
        styleRest={{ height: getHeight * 0.048 }}
        bgColor="redDark"
        activeLoading={isLoading}
        onPress={onConfirm}
      >
        <Text className="text-white font-poppinsSemiBold">Excluir</Text>
      </Button>
    </Modal.Content>
  </Modal.Root>
);

export default React.memo(DeleteConfirmationModal);
