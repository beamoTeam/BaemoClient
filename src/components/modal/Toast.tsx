import { useToastState } from '../../lib/recoil/toastState';
import { IonToast } from '@ionic/react';

export default function Toast() {
  const [toast, setToast] = useToastState();

  return (
    <>
      <IonToast
        isOpen={toast}
        onDidDismiss={() => setToast(false)}
        message={toast}
        duration={1500}
      />
    </>
  );
}