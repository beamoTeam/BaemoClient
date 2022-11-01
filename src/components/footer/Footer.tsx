import React, { useState, useMemo, useEffect } from "react";
import css from "./Footer.module.css";
import { IonIcon, IonLabel } from "@ionic/react";
import {
  newspaperOutline,
  personCircleOutline,
  chatboxOutline,
  addCircleOutline,
  homeOutline,
} from "ionicons/icons";
import { useHistory, useLocation } from "react-router";
import isLogin from "../../utils/isLogin";
import { useModalState } from "../../lib/recoil/modalState";
import ConfirmModal from "../modal/ConfirmModal";
import { KAKAO_LOGIN_LINK } from "../../utils/contants";

export default function Footer() {
  const location = useLocation();
  const history = useHistory();
  const [, setModal] = useModalState();
  const [currentPath, setCurrentPath] = useState<string>(location.pathname);

  const privateURL: any = useMemo(() => {
    return {
      "/home": false,
      "/chatting": true,
      "/make-group": true,
      "/chat-list": true,
      "/order-hisotry": true,
      "/profile": true,
    };
  }, []);

  const unVisibleURL: any = useMemo(() => {
    return {
      home: false,
      "make-group": false,
      "order-hisotry": false,
      profile: false,
      chatting: true,
      oauth: true,
      restaurant: true,
      cart: true,
    };
  }, []);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location, history, setCurrentPath]);

  const goTo = (e: any) => {
    const href = e.target.dataset.href;

    if (href === location.pathname) {
      return;
    }

    if (privateURL[href] && !isLogin()) {
      setModal(
        <ConfirmModal
          message={"로그인이 필요한 서비스 입니다. 로그인 하시겠습니까?"}
          onCancel={() => setModal(null)}
          onConfirm={() => (window.location.href = KAKAO_LOGIN_LINK)}
        />
      );
      return;
    }

    history.push(href);
  };

  if (unVisibleURL[location.pathname.split("/")[1]]) {
    return null;
  }

  return (
    <nav className={css.footer}>
      <ul className={css.list} onClick={goTo}>
        <li
          data-href="/home"
          className={currentPath === "/home" ? css["current"] : ""}
        >
          <IonIcon icon={homeOutline} className={css.icon} data-href="/home" />
          <IonLabel data-href="/home">홈</IonLabel>
        </li>
        <li
          data-href="/chat-list"
          className={currentPath === "/chat-list" ? css["current"] : ""}
        >
          <IonIcon
            icon={chatboxOutline}
            className={css.icon}
            data-href="/chat-list"
          />
          <IonLabel data-href="/chat-list">채팅</IonLabel>
        </li>
        <li
          data-href="/make-group"
          className={currentPath === "/make-group" ? css["current"] : ""}
        >
          <IonIcon
            icon={addCircleOutline}
            className={css.icon}
            data-href="/make-group"
          />
          <IonLabel data-href="/make-group">방만들기</IonLabel>
        </li>
        <li
          data-href="/order-hisotry"
          className={currentPath === "/order-hisotry" ? css["current"] : ""}
        >
          <IonIcon
            icon={newspaperOutline}
            className={css.icon}
            data-href="/order-hisotry"
          />
          <IonLabel data-href="/order-hisotry">주문내역</IonLabel>
        </li>
        <li
          data-href="/profile"
          className={currentPath === "/profile" ? css["current"] : ""}
        >
          <IonIcon
            icon={personCircleOutline}
            className={css.icon}
            data-href="/profile"
          />
          <IonLabel data-href="/profile">프로필</IonLabel>
        </li>
      </ul>
    </nav>
  );
}
