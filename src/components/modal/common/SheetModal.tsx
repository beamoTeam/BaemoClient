import { IonModal } from "@ionic/react";
import { modalState, modalPresentState } from "../../../lib/recoil/modalState";
import { useRecoilValue, useSetRecoilState } from "recoil";

interface SheetModalProps {
  children: React.ReactNode;
  type?: string;
}

export default function SheetModal({ children, type }: SheetModalProps) {
  const setModal = useSetRecoilState(modalState);
  const present = useRecoilValue(modalPresentState);

  const onDidDismiss = () => {
    setModal(null);
  };

  return (
    <div>
      <IonModal
        isOpen={present}
        initialBreakpoint={type ? 0.3 : 0.7}
        breakpoints={type ? undefined : [0, 0.25, 0.5, 0.75]}
        onDidDismiss={onDidDismiss}
      >
        <div style={{ marginTop: "15px", height: "100%" }}>{children}</div>
      </IonModal>
    </div>
  );
}
