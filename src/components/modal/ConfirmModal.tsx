import CardModal from "./common/CardModal";
import css from "./ConfirmModal.module.css";
import { useCallback } from "react";
import { useModalState } from "../../lib/recoil/modalState";
import { useHistory } from "react-router";

interface ConfirmModalProps {
  message: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

export default function ConfirmModal({
  message,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  const history = useHistory();
  const [, setModal] = useModalState();

  const close = useCallback(() => {
    if (onCancel) {
      onCancel?.();
    } else {
      console.log("요기");
      history.goBack();
    }
    setModal(null);
  }, [setModal, onCancel, history]);

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
