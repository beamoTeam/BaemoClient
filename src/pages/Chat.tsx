import { IonPage, IonContent, IonButton } from "@ionic/react";
import { useState, useRef, useEffect } from "react";
import css from "./Chat.module.css";
import chatService from "../lib/api/ChatService";
import { MessageModel } from "../types/chatMsg";
import { useChatMenuState } from "../lib/recoil/chatMenuState";
import { useHistory } from "react-router";
import { useLoginState } from "../lib/recoil/loginState";
const baseURL = `http://3.94.44.116:3999`;

export default function Chat() {
  const [, setChatMenu] = useChatMenuState();
  const history = useHistory();
  const [isLogin] = useLoginState();
  const [msgList, setMsgList] = useState<any>([]);
  const [msg, setMsg] = useState<string>("");
  const eventSource = useRef<any>(null);
  const scrollRef = useRef<any>(null);
  const roomNum = window.localStorage.getItem("CHAT_SEQ");
  const sender = window.localStorage.getItem("CHAT_SENDER");

  useEffect(() => {
    if (!isLogin) {
      history.goBack();
    }
  }, [isLogin, history]);

  useEffect(() => {
    if (!roomNum) {
      history.goBack();
    }
  }, [roomNum, history]);

  // EventSource
  if (!eventSource.current) {
    eventSource.current = new EventSource(`${baseURL}/chat/roomNum/${roomNum}`);
  }

  eventSource.current.onmessage = (e: any) => {
    const serverMsg: MessageModel = JSON.parse(e.data);
    if ("mainMenu" === serverMsg.sender.split("_")[0]) {
      setChatMenu((prev: any) => [
        ...prev,
        {
          sender: serverMsg.sender.split("_")[1],
          data: JSON.parse(serverMsg.msg),
        },
      ]);
    } else {
      setMsgList((prev: any) => [
        ...prev,
        {
          id: serverMsg.id,
          sender: serverMsg.sender,
          text: serverMsg.msg,
          time: serverMsg.createdAt.substring(11, 16),
        },
      ]);
    }
  };

  // hack
  useEffect(() => {
    scrollRef.current.scrollIntoView(false);
  }, [msgList]);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      // api call (send message)
      await chatService.sendMessage({
        sender,
        roomNum,
        msg,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setMsg("");
      scrollRef.current.scrollIntoView(false);
    }
  };

  return (
    <>
      <IonPage>
        <IonContent>
          <div className={css.Chat}>
            <ul className={css.textList}>
              {msgList.map((message: any) => (
                <div className={css.textBox} key={message.id}>
                  {message.sender === sender && (
                    <p className={css.msgTimeR}>{message.time}</p>
                  )}
                  <p
                    className={
                      message.sender === sender
                        ? css["textBoxR"]
                        : css["textBoxL"]
                    }
                  >
                    {message.text}
                  </p>
                  {message.sender !== sender && (
                    <p className={css.msgTimeL}>{message.time}</p>
                  )}
                </div>
              ))}
              <div ref={scrollRef}></div>
            </ul>
            <textarea
              className={css.textField}
              placeholder="채팅을 입력하세요"
              value={msg}
              onChange={(e) => setMsg(e.target.value!)}
            ></textarea>
            <div className={css.send}>
              <IonButton onClick={onSubmit}>전송</IonButton>
            </div>
          </div>
        </IonContent>
      </IonPage>
    </>
  );
}
