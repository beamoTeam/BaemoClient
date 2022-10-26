import { useAddrState } from "../../lib/recoil/addrState";
import { IonHeader, IonIcon, IonTitle, IonImg, IonButton } from "@ionic/react";
import {
  chevronDownOutline,
  locationOutline,
  chevronBackOutline,
  menuOutline,
} from "ionicons/icons";
import { useModalState } from "../../lib/recoil/modalState";
import css from "./GlobalHeader.module.css";
import AddressModal from "../modal/AddressModal";
import KakaoMapModal from "../modal/KakaoMapModal";
import LogoutModal from "../modal/LogoutModal";
import { useLoginState } from "../../lib/recoil/loginState";
import ModalContainer from "../modal/common/ModalPortal";
import { useLocation, useHistory } from "react-router";
import { useState, useCallback } from "react";
import { useChatMenuState } from "../../lib/recoil/chatMenuState";
import SlideMenu from "../modal/SlideMenu";

export default function GlobalHeader() {
  const location = useLocation();
  const history = useHistory();
  const [addr] = useAddrState();
  const [modal, setModal] = useModalState();
  const [chatMenu] = useChatMenuState();
  const [isLogin] = useLoginState();
  const [toggleSlide, setToggleSlide] = useState<boolean>(false);

  let isHome = location.pathname === "/home";
  let isChat = location.pathname === "/chatting";

  const setAddressModal = () => {
    setModal(<AddressModal />);
  };

  const setMapModal = () => {
    if (isHome) {
      setModal(<KakaoMapModal />);
    } else {
      history.goBack();
    }
  };

  const setLogoutModal = () => {
    setModal(<LogoutModal />);
  };

  const kakaoLogin = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code&prompt=login`;
  };

  const visible = (pathname: string) => {
    if (pathname.includes("chatting")) {
      return false;
    }
    if (pathname.includes("profile")) {
      return false;
    }
    return true;
  };

  const toggleSlideMenu = useCallback(() => {
    setToggleSlide((prev) => !prev);
  }, []);

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
        {visible(location.pathname) && (
          <>
            <div onClick={setAddressModal} className={css.headerMain}>
              <IonTitle className={css.addr}>
                {addr || "주소를 선택해주세요"}
                <IonIcon icon={chevronDownOutline} />
              </IonTitle>
            </div>
            <span>
              {isLogin ? (
                <IonButton onClick={setLogoutModal} style={logoutStyle}>
                  로그아웃
                </IonButton>
              ) : (
                <IonImg
                  src="assets/images/kakao_login_medium.png"
                  alt="kakao-login"
                  className={css.img}
                  onClick={kakaoLogin}
                />
              )}
            </span>
          </>
        )}
        {isChat && (
          <>
            <IonIcon
              icon={menuOutline}
              className={css.mapButton}
              onClick={toggleSlideMenu}
            />
            {toggleSlide && (
              <SlideMenu chatMenu={chatMenu} close={toggleSlideMenu} />
            )}
          </>
        )}
      </IonHeader>
      <ModalContainer />
    </>
  );
}

const logoutStyle = {
  width: "60px",
  height: "30px",
  fontSize: "0.8rem",
  fontWeight: "bold",
};
