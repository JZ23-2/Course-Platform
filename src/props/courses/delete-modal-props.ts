interface deleteModalProps {
  open: boolean;
  title?: string;
  description?: string;
  itemName?: string;
  onClose: () => void;
  onConfirm: () => void;
}
