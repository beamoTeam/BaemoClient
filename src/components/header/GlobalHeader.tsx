import { useMemo } from "react";
import { IonHeader, IonIcon, IonImg } from "@ionic/react";
import {
  chevronDownOutline,
  locationOutline,
  chevronBackOutline,
} from "ionicons/icons";
import { useModalState } from "../../lib/recoil/modalState";
import css from "./GlobalHeader.module.css";
import AddressModal from "../modal/AddressModal";
import KakaoMapModal from "../modal/KakaoMapModal";
import { useLoginState } from "../../lib/recoil/loginState";
import ModalContainer from "../modal/common/ModalPortal";
import { useLocation, useHistory } from "react-router";
import { useState, useCallback } from "react";

export default function GlobalHeader() {
  const location = useLocation();
  const history = useHistory();
  const [addr, setAddr] = useState<any>(window.localStorage.getItem("ADDR"));
  const [, setModal] = useModalState();
  const [isLogin] = useLoginState();

  let isHome = useMemo(
    () => location.pathname === "/home",
    [location.pathname]
  );
  let isChat = useMemo(
    () => location.pathname.split("/")[1] === "chatting",
    [location.pathname]
  );

  const unVisibleURL: any = useMemo(() => {
    return {
      chatting: true,
      profile: true,
      cart: true,
      restaurant: true,
    };
  }, []);

  const setMapModal = useCallback(() => {
    if (isHome) {
      setModal(<KakaoMapModal />);
    } else {
      setTimeout(() => {
        history.goBack();
      }, 0);
      return;
    }
  }, [history, isHome, setModal]);

  const kakaoLogin = () => {
    const kakao_redirect_url = window.location.origin.includes("local")
      ? process.env.REACT_APP_KAKAO_REDIRECT_URI
      : process.env.REACT_APP_KAKAO_REDIRECT_URI_SERVER;

    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${kakao_redirect_url}&response_type=code&prompt=login`;
  };

  if (location.pathname.includes("store")) {
    return null;
  }

  if (isChat) {
    return null;
  }

  return (
    <>
      <IonHeader className={css.globalHeader}>
        <div onClick={setMapModal}>
          {isHome ? (
            <IonIcon icon={locationOutline} className={css.mapButton} />
          ) : (
            <IonIcon icon={chevronBackOutline} className={css.mapButton} />
          )}
        </div>
        {!unVisibleURL[location.pathname.split("/")[1]] && (
          <>
            <div className={css.headerMain}>
              <div className={css.addr} id="open-address-modal">
                {addr || "주소를 선택해주세요"}
                <IonIcon icon={chevronDownOutline} />
              </div>
            </div>
            <div>
              {!isLogin && (
                <IonImg
                  src="assets/images/kakao_login_medium.png"
                  alt="kakao-login"
                  className={css.img}
                  onClick={kakaoLogin}
                />
              )}
            </div>
          </>
        )}
      </IonHeader>
      <ModalContainer />
      <AddressModal setAddr={setAddr} />
    </>
  );
}

// 클릭이 두번되거나
// 채팅 리스트에서 바로 뒤로 넘어가버리거나
