import React, { useEffect, useState } from "react";
import { IonModal, IonContent } from "@ionic/react";
import { useModalState } from "../../../lib/recoil/modalState";

interface SheetModalProps {
  children: React.ReactNode;
  trigger: string;
}

// hack?
export default function SheetModal({ children, trigger }: SheetModalProps) {
  // const [test, setTest] = useState<any>(null);
  // const [modal] = useModalState();

  // useEffect(() => {
  //   setTest(children);
  //   return () => setTest(null);
  // }, []);

  return (
    <IonModal
      trigger={trigger}
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
