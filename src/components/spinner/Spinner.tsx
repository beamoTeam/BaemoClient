import { IonSpinner } from "@ionic/react";

export default function Spinner() {
  return (
    <div
      style={{
        marginTop: "50px",
        width: "100vw",
        height: "84vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      className="ion-padding"
    >
      <IonSpinner></IonSpinner>
    </div>
  );
}
