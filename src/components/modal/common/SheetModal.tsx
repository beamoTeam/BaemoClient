import { IonModal } from "@ionic/react";
import { useModalState } from "../../../lib/recoil/modalState";
interface SheetModalProps {
  children: React.ReactNode;
}

export default function SheetModal({ children }: SheetModalProps) {
  const [modal, setModal] = useModalState();
  let present = modal ? true : false;
  return (
    <div>
      <IonModal
        isOpen={present}
        initialBreakpoint={0.7}
        onDidDismiss={(ev: any) => setModal(null)}
      >
        <>{children}</>
      </IonModal>
    </div>
  );
}
