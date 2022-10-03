import { useAddrState } from "../../lib/recoil/addrState";
import { IonHeader, IonIcon, IonTitle, IonImg, IonButton } from "@ionic/react";
import { chevronDownOutline, locationOutline } from "ionicons/icons";
import { useModalState } from "../../lib/recoil/modalState";
import css from "./GlobalHeader.module.css";
import AddressModal from "../modal/AddressModal";
import KakaoMapModal from "../modal/KakaoMapModal";
import LogoutModal from "../modal/LogoutModal";
import { useLoginState } from "../../lib/recoil/loginState";

export default function GlobalHeader() {
  const [addr] = useAddrState();
  const [, setModal] = useModalState();
  const [isLogin] = useLoginState();

  const setAddressModal = () => {
    setModal(<AddressModal />);
  };

  const setMapModal = () => {
    setModal(<KakaoMapModal />);
  };

  const setLogoutModal = () => {
    setModal(<LogoutModal />);
  };

  const kakaoLogin = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;
  };

  return (
    <>
      <IonHeader className={css.globalHeader}>
        <div onClick={setMapModal}>
          <IonIcon icon={locationOutline} className={css.mapButton} />
        </div>
        <div onClick={setAddressModal} className={css.headerMain}>
          <IonTitle className={css.addr}>
            {addr || "주소를 선택해주세요"}
            <IonIcon icon={chevronDownOutline} />
          </IonTitle>
        </div>
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
      </IonHeader>
    </>
  );
}

const logoutStyle = {
  width: "60px",
  height: "30px",
  fontSize: "0.8rem",
  fontWeight: "bold",
};
