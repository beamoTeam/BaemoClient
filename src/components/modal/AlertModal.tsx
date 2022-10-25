import { useCallback } from "react";
import { useModalState } from "../../lib/recoil/modalState";
import CardModal from "./common/CardModal";
import css from "./LogoutModal.module.css";

interface AlertModalProps {
  message: string;
}

export default function AlertModal({ message }: AlertModalProps) {
  const [, setModal] = useModalState();

  const close = useCallback(() => {
    setModal(null);
  }, [setModal]);

  return (
    <CardModal>
      <p className={css.alertText}>{message}</p>
      <div className={css.alertModalBtns}>
        <button className={css.yes} onClick={close}>
          확인
        </button>
      </div>
    </CardModal>
  );
}
