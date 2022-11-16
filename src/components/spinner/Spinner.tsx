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
        opacity: "0.8",
        zIndex: "9999"
      }}
      className="ion-padding"
    >
      <IonSpinner style={{
        color: "silver",
        top: "50%",
        left: "50%",
        backgroundColor: "red",
        transform: "translate(-50%, -50%)",
        zIndex: "10000"
      }}></IonSpinner>
      <p>{message}</p>
    </div>
  );
}

export function ButtonSpinner() {
  return <IonSpinner></IonSpinner>;
}
