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
        backgroundColor: "red",
        zIndex: "9999"
      }}
      className="ion-padding"
    >
      <IonSpinner style={{
        color: "silver",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}></IonSpinner>
      <p>{message}</p>
    </div>
  );
}

export function ButtonSpinner() {
  return <IonSpinner></IonSpinner>;
}
