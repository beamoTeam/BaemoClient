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
import userApis from "../lib/api/User/UserApi";
import { useEffect, useState } from "react";
import useUnAuthorized from "../hooks/useUnAuthorized";
import Spinner from "../components/spinner/Spinner";
import useLogout from "../hooks/useLogout";

export default function Profile() {
  const [userInfo, setUserInfo] = useState<any>(null);
  const logout = useLogout();
  const handleUnAuthorized = useUnAuthorized();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await userApis.fetchUserProfile();
        console.log("PROFILE :: ", data);
        setUserInfo(data);
      } catch (err: any) {
        handleUnAuthorized(err);
        alert("프로필을 불러오는중 오류가 발생했습니다.")
        console.error(err);
      }
    })();
  }, [logout]);

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
