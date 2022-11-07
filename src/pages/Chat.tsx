import { IonPage, IonButton, IonSpinner } from "@ionic/react";
import { useState, useRef, useEffect } from "react";
import css from "./Chat.module.css";
import chatService from "../lib/api/ChatService";
import { MessageModel } from "../types/chatMsg";
import { useChatMenuState } from "../lib/recoil/chatMenuState";
import { useHistory } from "react-router";
import { useLoginState } from "../lib/recoil/loginState";
import { useLocation } from "react-router";
import Spinner from "../components/spinner/Spinner";

interface ParsedMsg {
  id: string;
  msg: string | null;
  receiver: string | null;
  roomNum: number;
  sender: string | null;
  date: string;
  time: string;
  menu: object | null;
}

export default function Chat() {
  const [, setChatMenu] = useChatMenuState();
  const history = useHistory();
  const { pathname } = useLocation();
  const [isLogin] = useLoginState();
  const [sendLoading, setSendLoading] = useState<boolean>(false);
  const [msgList, setMsgList] = useState<any | null>(null);
  const [msg, setMsg] = useState<string>("");
  const eventSource = useRef<any>(null);
  const scrollRef = useRef<any>(null);
  const roomNum = Number(pathname.split("/").at(-1));
  const sender = window.localStorage.getItem("CHAT_SENDER");
  const dateHash: any = useRef<any>({});
  const senderHash: any = useRef<any>({});

  useEffect(() => {
    if (!isLogin || !roomNum || isNaN(roomNum)) {
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

    const test: ParsedMsg = {
      id: serverMsg.id,
      msg: serverMsg.receiver,
      receiver: serverMsg.receiver,
      roomNum: serverMsg.roomNum,
      sender: serverMsg.sender,
      date: "",
      time: "",
      menu: null,
    };

    // 1. menu filtering
    if (serverMsg.sender.includes("mainMenu")) {
      test.menu = JSON.parse(serverMsg.msg);
      test.sender = serverMsg.sender.split("_")[1];
    }

    const [yyyy, mm, dd]: any = serverMsg.createdAt;
    const create_date = `${yyyy}년 ${mm}월 ${dd}일`;
    test.date = `${yyyy}년 ${mm}월 ${dd}일`;
    let currentSender: string | null = serverMsg.sender;
    if (currentSender.includes("mainMenu")) {
      currentSender = null;
    }

    if (serverMsg.sender && "mainMenu" === serverMsg.sender.split("_")[0]) {
      setChatMenu((prev: any) => [
        ...prev,
        {
          sender: serverMsg.sender.split("_")[1],
          data: JSON.parse(serverMsg.msg),
        },
      ]);
    } else {
      const chatMsgData = {
        id: serverMsg.id,
        sender: serverMsg.sender,
        text: serverMsg.msg,
        date: dateHash.current[create_date] === true ? null : create_date,
        time: `${serverMsg.createdAt[3]}:${serverMsg.createdAt[4]}`,
      };

      setMsgList((prev: any) =>
        prev ? [...prev, chatMsgData] : [chatMsgData]
      );
      dateHash.current[create_date] = true;
      if (currentSender) {
        senderHash.current[currentSender] = true;
      }
    }
  };

  // hack
  useEffect(() => {
    scrollRef.current.scrollIntoView(false);
  }, [msgList]);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (msg.length === 0) {
      return;
    }
    setSendLoading(true);
    try {
      // api call (send message)
      await chatService.sendMessage({
        sender: sender,
        roomNum,
        msg,
      });
      scrollRef.current.scrollIntoView(false);
    } catch (err) {
      console.error(err);
    } finally {
      setMsg("");
      setSendLoading(false);
    }
  };

  console.log(msgList);
  return (
    <div className={css.chat}>
      <IonPage>
        {/* <div className={css.Chat}> */}
        <ul className={css.textList}>
          {!msgList ? (
            <Spinner />
          ) : (
            msgList.map((message: any) => (
              <div key={message.id}>
                {message.date && (
                  <div className={css.dateLine}>{message.date}</div>
                )}
                <div className={css.textBox}>
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
              </div>
            ))
          )}
          <div className={css.scrollRef} ref={scrollRef}></div>
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
        {/* </div> */}
      </IonPage>
    </div>
  );
}
