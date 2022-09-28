import {
  IonPage,
  IonContent,
  IonList,
  IonItem,
  IonTextarea,
} from "@ionic/react";
import { useState } from "react";
import "./Chatting.css";

export default function Chatting() {
  const [msg, setMsg] = useState<string>("");

  return (
    <IonPage>
      <IonContent>
        <IonList>
          <IonItem>
            <IonTextarea
              placeholder="채팅을 입력하세요"
              value={msg}
              onIonChange={(e) => setMsg(e.detail.value!)}
            ></IonTextarea>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
}

const test = {
  position: "fixed",
  bottom: "300px",
  left: 0,
  zIndex: 1000,
  border: "1px solid red",
};
