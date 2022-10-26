import { useCallback } from "react";
import { useModalState } from "../../../lib/recoil/modalState";
import "./CardModal.css";

interface CardModalProps {
  children?: React.ReactNode;
  type?: string;
}

export default function CardModal({ children, type }: CardModalProps) {
  const [, setModal] = useModalState();

  const close = useCallback(() => {
    setModal(null);
  }, [setModal]);

  return (
    <div>
      <div className="card-modal-bg" onClick={close}></div>
      <div className="card-modal-wrap">
        <div className="card-modal">{children}</div>
      </div>
    </div>
  );
}
