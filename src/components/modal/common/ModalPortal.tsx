import React from "react";
import ReactDOM from "react-dom";
import { useModalState } from "../../../lib/recoil/modalState";

interface ModalPortalProps {
  children: React.ReactNode;
}

export default function ModalContainer() {
  const [modal, setModal] = useModalState();

  return (
    <Portal>
      <div onClick={() => setModal(null)}>{modal}</div>
    </Portal>
  );
}

function Portal({ children }: ModalPortalProps) {
  const modalRoot = document.getElementById("modal-root") as HTMLElement;
  return ReactDOM.createPortal(children, modalRoot);
}

// 모달이 사라지는거는 내가 제어하고 있지 않음.
