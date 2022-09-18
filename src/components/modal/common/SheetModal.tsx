import { useEffect, useState } from "react";
import { IonModal } from "@ionic/react";
import { useModalState } from "../../../lib/recoil/modalState";
interface SheetModalProps {
  children: React.ReactNode;
}

// hack?
export default function SheetModal({ children }: SheetModalProps) {
  const [modal, setModal] = useModalState();
  const [sibal, setSibal] = useState<boolean>(false);

  useEffect(() => {
    setSibal(modal ? true : false);
    return () => setSibal(false);
  }, []);

  console.log({ sibal });
  return (
    <div>
      <IonModal isOpen={sibal} initialBreakpoint={0.7}>
        <>{children}</>
      </IonModal>
    </div>
  );
}

// 모달을 닫을떄 문제가 있음.
// dom에서 unmount가 안됨
// 모달을 열고 닫을떄 트리거를 이용해서 닫고있음.
// 트리거를 닫으면 sheet모달이 내려가기만 하지
// children이 unmount되는건아님.

// 지금 sheet모달이 unmount되는게 아니라
// DOM은 남아있고 가려지기만 하는거임.
