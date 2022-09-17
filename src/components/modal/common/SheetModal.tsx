import React from "react";
import { IonModal, IonContent } from "@ionic/react";

interface SheetModalProps {
  children?: React.ReactNode;
}

// hack
export default function SheetModal({ children }: SheetModalProps) {
  return (
    <IonModal
      trigger="open-address-modal"
      isOpen={true}
      initialBreakpoint={0.7}
      breakpoints={[0, 0.25, 0.5, 1]}
      handleBehavior="cycle"
    >
      <IonContent className="ion-padding">
        <>{children}</>
      </IonContent>
    </IonModal>
  );
}
