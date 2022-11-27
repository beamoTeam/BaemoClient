import {
  IonPage,
  IonButton,
  IonSpinner,
  IonIcon,
  IonHeader,
} from "@ionic/react";
import { useState, useRef, useEffect, useCallback } from "react";
import { menuOutline, chevronBackOutline } from "ionicons/icons";
import css from "./Chat.module.css";
import chatService from "../lib/api/ChatService";
import { MessageModel } from "../types/chatMsg";
import { useChatMenuState } from "../lib/recoil/chatMenuState";
import { useHistory } from "react-router";
import { useLoginState } from "../lib/recoil/loginState";
import { useLocation } from "react-router";
import { anonymousName } from "../utils/name";
import SlideMenu from "../components/modal/SlideMenu";
import Spinner from "../components/spinner/Spinner";

interface ParsedMsg {
  id: string;
  msg: string | null;
  receiver: string | null;
  roomNum: number;
  sender: string | null;
  date: string | null;
  time: string;
  menu: object | null;
  isCurrentSender: boolean;
}

export default function Chat() {
  const [, setChatMenu] = useChatMenuState();
  const history = useHistory();
  const { pathname } = useLocation();
  const [isLogin] = useLoginState();
  const scrollRef = useRef<any>(null);
  const eventSource = useRef<any>(null);
  const dateHash: any = useRef<any>({});
  const currentSender = useRef<any>(null);
  const [msg, setMsg] = useState<string>("");
  const roomNum = Number(pathname.split("/").at(-1));
  const [msgList, setMsgList] = useState<any | null>(null);
  const sender = window.localStorage.getItem("CHAT_SENDER");
  const [sendLoading, setSendLoading] = useState<boolean>(false);
  const [toggleSlide, setToggleSlide] = useState<boolean>(false);

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
      receiver: serverMsg.receiver,
      roomNum: serverMsg.roomNum,
      msg: serverMsg.msg,
      menu: null,
      sender: serverMsg.sender,
      date: "",
      time: "",
      isCurrentSender: true,
    };

    // 1. menu filtering
    if (serverMsg.sender.includes("mainMenu_")) {
      test.msg = null;
      test.menu = JSON.parse(serverMsg.msg)
        .map((menu: any) => `${menu.name} x ${menu.count}개`)
        .join("");
      test.sender = serverMsg.sender.split("_")[1];
      setChatMenu((prev: any) => [
        ...prev,
        {
          sender: test.sender,
          menu: JSON.parse(serverMsg.msg),
        },
      ]);
    }

    // 2. time filtering
    const [yyyy, mm, dd]: any = serverMsg.createdAt;
    const create_date = `${yyyy}년 ${mm}월 ${dd}일`;
    test.date = dateHash.current[create_date] === true ? null : create_date;
    test.time = `${serverMsg.createdAt[3]}:${serverMsg.createdAt[4]}`;

    // 3. sender
    if (test.sender !== currentSender.current) {
      currentSender.current = test.sender;
      test.isCurrentSender = false;
    }

    setMsgList((prev: any) => (prev ? [...prev, test] : [test]));

    console.log("TEST :: ", test);
    dateHash.current[create_date] = true;
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
      alert("알수없는 오류가 발생했습니다.");
      console.error(err);
    } finally {
      setMsg("");
      setSendLoading(false);
    }
  };

  const toggleSlideMenu = useCallback(() => {
    setToggleSlide((prev) => !prev);
  }, []);

  const goBack = useCallback(() => {
    history.goBack();
    return;
  }, [history]);

  // 메세지 아무것도 안올때 어케해야될지 모르겠음.
  useEffect(() => {
    if (!msgList) {
      setMsgList([]);
    }
  }, [msgList]);

  return (
    <div>
      <IonPage>
        {toggleSlide && <SlideMenu toggleSlideMenu={toggleSlideMenu} />}
        <ChatHeader goBack={goBack} toggleSlideMenu={toggleSlideMenu} />
        <ul className={css.textList}>
          {!msgList ? (
            <Spinner />
          ) : (
            msgList.map((message: any) => (
              <div key={message.id}>
                {message.date && <DateIndicator date={message.date} />}
                <div className={css.textBox}>
                  {message.sender !== sender &&
                    (message.isCurrentSender ? (
                      <PlaneLeftChatBox message={message} />
                    ) : (
                      <LeftChatBox message={message} />
                    ))}
                  {message.sender === sender && (
                    <RightChatBox message={message} />
                  )}
                </div>
              </div>
            ))
          )}
          <div className={css.scrollRef} ref={scrollRef}></div>
        </ul>
        {/* 입력창 */}
        <>
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
        </>
      </IonPage>
    </div>
  );
}

function LeftChatBox({ message }: any) {
  return (
    <div className={css.leftWrap}>
      <div className={css.chatAvatar}></div>
      <div>
        <p className={css.leftSender}>{anonymousName(message.sender)}</p>
        <div className={css.leftMsgTime}>
          <p className={css.textBoxL}>
            {message.msg || JSON.stringify(message.menu)}
          </p>
          <p className={css.msgTimeR}>{message.time}</p>
        </div>
      </div>
    </div>
  );
}

function RightChatBox({ message }: any) {
  return (
    <>
      <p className={css.msgTimeR}>{message.time}</p>
      <p className={css.textBoxR}>
        {message.msg || JSON.stringify(message.menu)}
      </p>
    </>
  );
}

function PlaneLeftChatBox({ message }: any) {
  return (
    <div className={css.leftWrapPlane}>
      <div className={css.chatAvatarPlane}></div>
      <div>
        <p className={css.leftSenderPlane}></p>
        <div className={css.leftMsgTime}>
          <p className={css.textBoxL}>
            {message.msg || JSON.stringify(message.menu)}
          </p>
          <p className={css.msgTimeR}>{message.time}</p>
        </div>
      </div>
    </div>
  );
}

function DateIndicator({ date }: any) {
  return <div className={css.dateLine}>{date}</div>;
}

function ChatHeader({ goBack, toggleSlideMenu }: any) {
  return (
    <>
      <IonHeader className={css.chatHeader}>
        <div onClick={goBack}>
          <IonIcon icon={chevronBackOutline} className={css.mapButton} />
        </div>
        <div>
          <IonIcon
            icon={menuOutline}
            className={css.mapButton}
            onClick={toggleSlideMenu}
          />
        </div>
      </IonHeader>
    </>
  );
}
