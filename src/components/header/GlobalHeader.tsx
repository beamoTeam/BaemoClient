import { useAddrState } from "../../lib/recoil/addrState";
import { IonHeader, IonIcon, IonTitle, IonImg, IonButton } from "@ionic/react";
import {
  chevronDownOutline,
  locationOutline,
  chevronBackOutline,
} from "ionicons/icons";
import { useModalState } from "../../lib/recoil/modalState";
import css from "./GlobalHeader.module.css";
import AddressModal from "../modal/AddressModal";
import KakaoMapModal from "../modal/KakaoMapModal";
import LogoutModal from "../modal/LogoutModal";
import { useLoginState } from "../../lib/recoil/loginState";
import ModalContainer from "../modal/common/ModalPortal";
import { useLocation, useHistory } from "react-router";

export default function GlobalHeader() {
  const location = useLocation();
  const history = useHistory();
  const [addr] = useAddrState();
  const [, setModal] = useModalState();
  const [isLogin] = useLoginState();
  let isHome = location.pathname === "/home";

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
    if (pathname.includes("chat")) {
      return false;
    }
    return true;
  };

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
