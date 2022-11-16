import css from "./Profile.module.css";
import {
  IonPage,
  IonContent,
  IonLabel,
  IonToolbar,
  IonList,
  IonItem,
  IonAvatar,
  IonImg,
} from "@ionic/react";
import { useModalState } from "../lib/recoil/modalState";
import LogoutModal from "../components/modal/LogoutModal";
import userApis from "../lib/api/User/UserApi";
import { useEffect, useState } from "react";
import Spinner from "../components/spinner/Spinner";
import { useLoginState } from "../lib/recoil/loginState";
import { useHistory } from "react-router";
import AccessToken from "../hooks/useToken";
import useLogout from "../hooks/useLogout";
import useLocalStorage from "../hooks/useLocalStorage";

export default function Profile() {
  const history = useHistory();
  const [isLogin] = useLoginState();
  const [, setModal] = useModalState();
  const [userInfo, setUserInfo] = useState<any>(null);
  const logout = useLogout();

  useEffect(() => {
    if (!isLogin) {
      history.goBack();
    }
  }, [isLogin, history]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await userApis.fetchUserProfile();
        setUserInfo(data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  if (!userInfo) return <Spinner />;

  return (
    <IonPage style={{ marginTop: "50px" }}>
      <IonContent className="ion-padding">
        <IonItem>
          <IonAvatar slot="start">
            <IonImg src={userInfo.profile} />
          </IonAvatar>
          <IonLabel>
            <h1 style={{ fontWeight: "600" }}>{userInfo.name}</h1>
            <p>{userInfo.email}</p>
          </IonLabel>
        </IonItem>
        <p></p>
        <IonToolbar>
          <div className={css.toolBar}>
            <div className={css.title}>
              <div>Point</div>
              <div style={{ color: "#0066cc" }}>
                {userInfo.point.toLocaleString()} P
              </div>
            </div>
            <div className={css.charge}>+ 충전하기</div>
          </div>
        </IonToolbar>
        <IonItem></IonItem>
        <p className={css.list}>
          <IonList lines="none">
            <IonItem>
              <IonLabel>문의하기</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel
                style={{ color: "red" }}
                onClick={logout}
              >
                로그아웃
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel style={{ color: "red" }}>회원 탈퇴</IonLabel>
            </IonItem>
          </IonList>
        </p>
      </IonContent>
    </IonPage>
  );
}
