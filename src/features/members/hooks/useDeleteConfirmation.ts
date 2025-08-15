import { useState } from "react";
import { IMember } from "../domain/entities/Member";

export const useDeleteConfirmation = () => {
  const [hasMemberToDelete, setHasMemberToDelete] = useState<IMember | null>(
    null
  );

  const openDeleteConfirmation = (member: IMember) =>
    setHasMemberToDelete(member);

  const closeDeleteConfirmation = () => setHasMemberToDelete(null);

  const confirmDelete = (onDelete: (member: IMember) => void) => {
    if (hasMemberToDelete) {
      onDelete(hasMemberToDelete);
      closeDeleteConfirmation();
    }
  };

  return {
    hasMemberToDelete,
    openDeleteConfirmation,
    closeDeleteConfirmation,
    confirmDelete,
  };
};
