import CardModal from "./common/CardModal";
import css from "./ConfirmModal.module.css";
import { useCallback } from "react";
import { useModalState } from "../../lib/recoil/modalState";

interface ConfirmModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  message,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  const [, setModal] = useModalState();

  const close = useCallback(() => {
    onCancel();
    setModal(null);
  }, [setModal, onCancel]);

  return (
    <CardModal>
      <p className={css.confirmText}>{message}</p>
      <div className={css.confirmModalBtns}>
        <button className={css.no} onClick={close}>
          취소
        </button>
        <button className={css.yes} onClick={onConfirm}>
          확인
        </button>
      </div>
    </CardModal>
  );
}
