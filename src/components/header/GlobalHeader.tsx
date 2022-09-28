import { useAddrState } from "../../lib/recoil/addrState";
import { IonHeader, IonIcon, IonTitle } from "@ionic/react";
import { chevronDownOutline, locationOutline } from "ionicons/icons";
import { useModalState } from "../../lib/recoil/modalState";
import css from "./GlobalHeader.module.css";
import AddressModal from "../modal/AddressModal";
import KakaoMapModal from "../modal/KakaoMapModal";
// import LoginModal from "../modal/LoginModal";
import loginService from "../../lib/api/LoginService";

export default function GlobalHeader() {
  const [addr] = useAddrState();
  const [, setModal] = useModalState();

  const setAddressModal = () => {
    setModal(<AddressModal />);
  };

  const setMapModal = () => {
    setModal(<KakaoMapModal />);
  };

  // const setLoginModal = () => {
  //   setModal(<LoginModal />);
  // };

  const kakaoLogin = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;
    console.log(2);
  };

  const logOut = async () => {
    const res = await loginService.logout();
    console.log("로그아웃 응답값", res);
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
          </IonTitle>
          <IonIcon icon={chevronDownOutline} />
        </div>
        <div onClick={logOut}>로그아웃</div>
        <div onClick={kakaoLogin}>로그인</div>
      </IonHeader>
    </>
  );
}
