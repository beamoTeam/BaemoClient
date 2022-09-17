import React from "react";
import ReactDOM from "react-dom";
import { useModalState } from "../../lib/recoil/modalState";

interface ModalPortalProps {
  children: React.ReactNode;
}

// interface ModalContainerProps {
//   children: React.ReactNode;
// }

export default function ModalContainer() {
  const [modal, setModal] = useModalState();
  console.log(modal);
  return (
    <Portal>
      {modal && <div onClick={() => setModal(null)}>{modal}</div>}
    </Portal>
  );
}

function Portal({ children }: ModalPortalProps) {
  const modalRoot = document.getElementById("modal-root") as HTMLElement;
  return ReactDOM.createPortal(children, modalRoot);
}
