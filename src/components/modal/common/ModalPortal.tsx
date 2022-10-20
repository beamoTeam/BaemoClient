import React from "react";
import ReactDOM from "react-dom";
import { useModalState } from "../../../lib/recoil/modalState";

interface ModalPortalProps {
  children: React.ReactNode;
}

export default function ModalContainer() {
  const [modal] = useModalState();

  return (
    <Portal>
      <div onClick={() => console.log(33)}>{modal}</div>
    </Portal>
  );
}

function Portal({ children }: ModalPortalProps) {
  const modalRoot = document.getElementById("modal-root") as HTMLElement;
  return ReactDOM.createPortal(children, modalRoot);
}
