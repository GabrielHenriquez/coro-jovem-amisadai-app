import { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { DrawerParamList } from "@navigation/drawer/DrawerNavigator";

interface UseEventActionsProps {
  event: any;
  handleModalAction: (ref: any, action: "present" | "close") => void;
  bottomSheetModalRef: any;
  handleDeleteEvent: (event: any) => void;
  setVisibleModalDelete: (visible: boolean) => void;
}

export const useEventActions = ({
  event,
  handleModalAction,
  bottomSheetModalRef,
  handleDeleteEvent,
  setVisibleModalDelete,
}: UseEventActionsProps) => {
  const { navigate } = useNavigation<DrawerNavigationProp<DrawerParamList>>();

  const handleEditCall = useCallback(() => {
    handleModalAction(bottomSheetModalRef, "close");
    setTimeout(() => {
      if (event) {
        navigate("CallsNavigation", {
          screen: "CreateCall",
          params: { event },
        });
      }
    }, 400);
  }, [handleModalAction, bottomSheetModalRef, event, navigate]);

  const handleDeleteCall = useCallback(() => {
    if (event) handleDeleteEvent(event);
  }, [event, handleDeleteEvent]);

  const handleOpenModalDelete = useCallback(() => {
    setVisibleModalDelete(true);
  }, [setVisibleModalDelete]);

  return {
    handleEditCall,
    handleDeleteCall,
    handleOpenModalDelete,
  };
};
