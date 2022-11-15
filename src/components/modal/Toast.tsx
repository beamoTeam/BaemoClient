import { useToastState } from '../../lib/recoil/toastState';
import { IonToast } from '@ionic/react';

interface ToastProps {
  message: string;
}

export default function Toast({ message }: ToastProps) {
  const [toast, setToast] = useToastState();

  return (
    <>
      <IonToast
        isOpen={toast}
        onDidDismiss={() => setToast(false)}
        message={message}
        duration={1500}
      />
    </>
  );
}