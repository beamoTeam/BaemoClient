import { IonModal, IonContent } from "@ionic/react";
import React from "react";
import { useModalState } from "../../lib/recoil/modalState";

interface SheetModalProps {
  children: React.ReactNode;
}

export default function SheetModal({ children }: SheetModalProps) {
  const [modal] = useModalState();

  return (
    <IonModal
      trigger="open-address-modal"
      isOpen={false}
      initialBreakpoint={0.7}
      breakpoints={[0, 0.25, 0.5, 1]}
      handleBehavior="cycle"
    >
      <IonContent className="ion-padding">{children}</IonContent>
    </IonModal>
  );
}
