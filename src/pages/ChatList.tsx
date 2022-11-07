import css from "./ChatList.module.css";
import {
  IonPage,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonImg,
  IonListHeader,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useLoginState } from "../lib/recoil/loginState";
import { useHistory } from "react-router";
import userApis from "../lib/api/User/UserApi";
import Spinner from "../components/spinner/Spinner";
import { ChatRoomModel } from "../types/chatRoom";
import { elapsedText } from "../utils/date";

export default function ChatList() {
  const history = useHistory();
  const [isLogin] = useLoginState();
  const [chatList, setChatList] = useState<ChatRoomModel[] | null>(null);

  useEffect(() => {
    if (!isLogin) {
      history.push("/");
    }
  }, [isLogin, history]);

  useEffect(() => {
    (async () => {
      const { data } = await userApis.fetchUserChatList();
      // console.log(data);
      setChatList(data);
    })();
  }, []);

  const enterToChat = (chat_seq: number) => {
    history.push(`/chatting/${chat_seq}`);
  };

  if (!chatList) return <Spinner />;
  if (chatList.length === 0) return <h4>No Chat List</h4>;

  return (
    <IonPage style={{ marginBottom: "55px", marginTop: "50px" }}>
      <IonContent fullscreen>
        <IonListHeader>
          <IonLabel>채팅 목록</IonLabel>
        </IonListHeader>

        <IonList>
          {chatList.map(({ seq, chatInfo }) => (
            <IonItem
              key={seq}
              className={css.chatItem}
              onClick={() => enterToChat(seq)}
            >
              <IonImg src={chatInfo.restaurant.img} className={css.img} />
              <IonLabel>
                <h2>
                  채팅 {seq}{" "}
                  <span className={css.restName}>{chatInfo.name}</span>
                </h2>
                <div className={css.closeTime}>
                  모집 마감 {chatInfo.orderTime.split(" ").at(-1)}
                </div>
                <p className={css.lastUpdate}>
                  {elapsedText(chatInfo.updatedDateTime)}
                </p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
}
