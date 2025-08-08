export interface IToast {
  message: string;
  visible: boolean;
  onHide: () => void;
}

export interface IToastViewModel {
  visible: boolean;
  onHide: () => void;
}
