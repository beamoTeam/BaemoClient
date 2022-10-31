import { IonPage, IonContent, IonButton, IonSpinner } from "@ionic/react";
import { useState, useRef, useEffect } from "react";
import css from "./Chat.module.css";
import chatService from "../lib/api/ChatService";
import { MessageModel } from "../types/chatMsg";
import { useChatMenuState } from "../lib/recoil/chatMenuState";
import { useHistory } from "react-router";
import { useLoginState } from "../lib/recoil/loginState";

export default function Chat() {
  const [, setChatMenu] = useChatMenuState();
  const history = useHistory();
  const [isLogin] = useLoginState();
  const [sendLoading, setSendLoading] = useState<boolean>(false);
  const [msgList, setMsgList] = useState<any>([]);
  const [msg, setMsg] = useState<string>("");
  const eventSource = useRef<any>(null);
  const scrollRef = useRef<any>(null);
  const roomNum = window.localStorage.getItem("CHAT_SEQ");
  const sender = window.localStorage.getItem("CHAT_SENDER");
  const dateHash: any = {};
  const nameHash: any = {};

  useEffect(() => {
    if (!isLogin || !roomNum) {
      history.goBack();
    }
  }, [isLogin, roomNum, history]);

  // EventSource
  if (!eventSource.current) {
    eventSource.current = new EventSource(
      `${process.env.REACT_APP_CHAT_URL}chat/roomNum/${roomNum}`
    );
  }

  eventSource.current.onmessage = (e: any) => {
    const serverMsg: MessageModel = JSON.parse(e.data);
    console.log(serverMsg);
    const [yyyy, mm, dd]: any = serverMsg.createdAt;
    const create_date = `${yyyy}-${mm}-${dd}`;

    console.log(serverMsg);
    if (serverMsg.sender && "mainMenu" === serverMsg.sender.split("_")[0]) {
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
          date: dateHash[create_date] ? null : `${yyyy}년 ${mm}월 ${dd}일`,
          time: `${serverMsg.createdAt[3]}:${serverMsg.createdAt[4]}`,
        },
      ]);
    }
    dateHash[create_date] = true;
  };

  // hack
  useEffect(() => {
    scrollRef.current.scrollIntoView(false);
  }, [msgList]);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setSendLoading(true);
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
      setSendLoading(false);
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
                <>
                  {message.date && (
                    <div key={message.date} className={css.dateLine}>
                      {message.date}
                    </div>
                  )}
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
                </>
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
              {sendLoading ? (
                <IonButton>
                  <IonSpinner />
                </IonButton>
              ) : (
                <IonButton onClick={onSubmit}>전송</IonButton>
              )}
            </div>
          </div>
        </IonContent>
      </IonPage>
    </>
  );
}
