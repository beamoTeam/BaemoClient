import { IonSpinner } from "@ionic/react";

interface SpinnerProps {
  message?: string;
}

export default function Spinner({ message }: SpinnerProps) {
  return (
    <div
      style={{
        position: "fixed",
        top: "55px",
        marginTop: "50px",
        width: "100vw",
        height: "84vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
      className="ion-padding"
    >
      <IonSpinner></IonSpinner>
      <p>{message}</p>
    </div>
  );
}
