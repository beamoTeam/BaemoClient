import {
  IonPage,
  IonContent,
  IonTextarea,
  IonAccordion,
  IonAccordionGroup,
  IonItem,
  IonImg,
  IonLabel,
  IonButton,
} from "@ionic/react";
import { useState, useRef } from "react";
import css from "./Chat.module.css";
import { useParams } from "react-router";
import chatService from "../lib/api/ChatService";
import { MessageModel } from "../types/chatMsg";

export default function Chat() {
  const { room_seq } = useParams<{ room_seq: any }>();
  const [msgList, setMsgList] = useState<any>([]);
  const [msg, setMsg] = useState<string>("");
  const baseURL = `http://3.94.44.116:3999`;
  const eventSource = useRef<any>(null);

  // // EventSource
  if (!eventSource.current) {
    eventSource.current = new EventSource(`${baseURL}/chat/roomNum/${1}`);
  }
  eventSource.current.onmessage = (e: any) => {
    const receivedMessage: MessageModel = JSON.parse(e.data);
    console.log(receivedMessage);
    setMsgList((prev: any) => [
      ...prev,
      { src: "other", text: receivedMessage.msg },
    ]);
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const chatBody = JSON.parse(window.localStorage.getItem("CHAT_BODY")!);
      const { data } = await chatService.sendMessage({
        ...chatBody,
        roomNum: 1,
        msg,
      });
      console.log(data);
      setMsgList([...msgList, { sender: data.sender, text: data.msg }]);
    } catch (err) {
      console.error(err);
    } finally {
      setMsg("");
    }
  };

  return (
    <IonPage>
      <IonContent>
        <div className={css.Chat}>
          {/* {cartItems && <Example cartItems={cartItems} />} */}
          <ul className={css.textList}>
            <p className={css.alert}>User1님이 입장하셨습니다.</p>
            {msgList.map((message: any, idx: number) => (
              <p key={idx} className={css.textBoxL}>
                {message.src === "other"
                  ? "왼쪽배치" + message.text
                  : "오른쪽" + message.text}
              </p>
            ))}
            {/* <p className={css.textBoxL}>Hell World</p>
            <p className={css.textBoxL}>I'm Fine Thank you and you?</p> */}
          </ul>
          <IonTextarea
            className={css.textField}
            placeholder="채팅을 입력하세요"
            value={msg}
            onIonChange={(e) => setMsg(e.detail.value!)}
          >
            <IonButton style={sendBtn} onClick={onSubmit}>
              전송
            </IonButton>
          </IonTextarea>
        </div>
      </IonContent>
    </IonPage>
  );
}

interface CartItemsProps {
  cartItems: any;
}

function Example({ cartItems }: CartItemsProps) {
  return (
    <IonAccordionGroup expand="inset">
      <IonAccordion value="first">
        <IonItem slot="header" color="light">
          <IonLabel>User 1</IonLabel>
        </IonItem>

        <div className="ion-padding" slot="content">
          {cartItems.basketMenuList.map((menu: any, idx: number) => {
            return (
              <div key={idx} style={acorItem}>
                <IonImg src={menu.img} style={imgSize} />
                <span style={fontSize}>
                  {menu.name} x {menu.count} :{" "}
                </span>
                <span style={fontSize}>
                  {(menu.count * menu.price).toLocaleString()}원
                </span>
              </div>
            );
          })}
        </div>
      </IonAccordion>
    </IonAccordionGroup>
  );
}

const acorItem = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  borderBottom: "1px solid silver",
  padding: "12px 0",
};

const imgSize = {
  width: "50px",
  height: "30px",
};

const fontSize = {
  fontSize: "14px",
};

const sendBtn = {
  position: "fixed",

  bottom: "3px",
  right: "10px",
};
