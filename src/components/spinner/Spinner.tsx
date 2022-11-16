import { IonSpinner } from "@ionic/react";

interface SpinnerProps {
  message?: string;
}

export default function Spinner({ message }: SpinnerProps) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        marginTop: "50px",
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        opacity: "0.93",
        zIndex: 10091
      }}
      className="ion-padding"
    >
      <IonSpinner
        style={{
        color: "silver",
        transform: "translate(-45%, -45%)",
      }}></IonSpinner>
      <p>{message}</p>
    </div>
  );
}

export function ButtonSpinner() {
  return <IonSpinner></IonSpinner>;
}

