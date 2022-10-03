import { IonModal } from "@ionic/react";
import { useModalState } from "../../../lib/recoil/modalState";

interface SheetModalProps {
  children: React.ReactNode;
  type?: string;
}

export default function SheetModal({ children, type }: SheetModalProps) {
  const [modal, setModal] = useModalState();
  let present = modal ? true : false;

  return (
    <div>
      <IonModal
        isOpen={present}
        initialBreakpoint={type ? 0.4 : 0.7}
        breakpoints={type ? undefined : [0, 0.25, 0.5, 0.75]}
        onDidDismiss={() => setModal(null)}
      >
        <div style={{ marginTop: "15px", height: "100%" }}>{children}</div>
      </IonModal>
    </div>
  );
}
