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
import { useState, useEffect } from "react";
import css from "./Chat.module.css";
import { useParams, useLocation } from "react-router";
import groupOrderService from "../lib/api/GroupOrderService";

export default function Chat() {
  const { room_seq } = useParams<{ room_seq: any }>();
  const location = useLocation();

  const [msgList, setMsgList] = useState<string[]>([]);
  const [cartItems, setCartItems] = useState(null);
  const [msg, setMsg] = useState<string>("");

  useEffect(() => {
    (async () => {
      try {
        const tmp_room_seq = location.pathname.split("/").at(-1);
        const { data } = await groupOrderService.fetchCartItems(
          room_seq || tmp_room_seq
        );
        console.log("** : ", data);
        setCartItems(data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [location.pathname, room_seq]);

  const onSubmit = () => {
    setMsgList([...msgList, msg]);
    setMsg("");
  };

  return (
    <IonPage>
      <IonContent>
        <div className={css.Chat}>
          {cartItems && <Example cartItems={cartItems} />}
          <ul className={css.textList}>
            <p className={css.alert}>User1님이 입장하셨습니다.</p>
            {msgList.map((message, idx) => (
              <p key={idx} className={css.textBoxL}>
                {message}
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
