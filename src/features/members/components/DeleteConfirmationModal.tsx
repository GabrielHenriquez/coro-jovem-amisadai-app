import * as Component from "@components/index";
import { IMember } from "../domain/entities/Member";
import { getHeight } from "@utils/index";

interface DeleteConfirmationModalProps {
  visible: boolean;
  memberToDelete: IMember | null;
  onClose: () => void;
  onConfirm: (member: IMember) => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  visible,
  memberToDelete,
  onClose,
  onConfirm,
}) => {
  const handleConfirm = () => {
    if (memberToDelete) onConfirm(memberToDelete);
  };

  return (
    <Component.Modal.Root>
      <Component.Modal.Content visible={visible}>
        <Component.Modal.AreaCloseModal onClose={onClose} />
        <Component.Spacer height={16} />
        <Component.Modal.Title>
          Tem certeza que deseja excluir?
        </Component.Modal.Title>
        <Component.Modal.Subtitle>
          Essa ação não pode ser desfeita.
        </Component.Modal.Subtitle>
        <Component.Button
          styleRest={{ height: getHeight * 0.048 }}
          bgColor="redDark"
          onPress={handleConfirm}
        >
          <Component.Text className="text-white font-poppinsSemiBold">
            Excluir
          </Component.Text>
        </Component.Button>
      </Component.Modal.Content>
    </Component.Modal.Root>
  );
};

export default DeleteConfirmationModal;
