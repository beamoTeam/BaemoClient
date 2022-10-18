import {
  IonPage,
  IonContent,
  IonLabel,
  IonListHeader,
  IonItem,
  IonButton,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import css from "./MakeChat.module.css";

const MakeGroup: React.FC = () => {
  const current = new Date();
  const currentHour = current.getHours();
  const currentMinute = current.getMinutes();

  return (
    <IonPage style={{ paddingTop: "50px" }}>
      <IonContent fullscreen>
        <div className="make-chat-content">
          <IonListHeader>
            <IonLabel>배달 정보</IonLabel>
          </IonListHeader>
          <IonItem>
            <div className={css.addr}>
              <p>
                전라남도 무안군 청계면 도림리 61 목포대학교 [도로명] 영산로 1666
                목포대학교
              </p>
              <IonButton>주소 변경</IonButton>
            </div>
          </IonItem>

          <IonListHeader>
            <IonLabel>음식점</IonLabel>
          </IonListHeader>
          <IonItem>
            <div className={css.restaurant}>
              <p>주소가 자동으로 입력됨</p>
              <IonButton>음식점 찾기</IonButton>
            </div>
          </IonItem>

          {/* <IonListHeader>
            <IonLabel>모집인원 수</IonLabel>
          </IonListHeader>
          <IonItem>
            <IonSelect interface="popover" placeholder="모집인원">
              <IonSelectOption value="1">1명</IonSelectOption>
              <IonSelectOption value="2">2명</IonSelectOption>
              <IonSelectOption value="3">3명</IonSelectOption>
              <IonSelectOption value="4">4명</IonSelectOption>
            </IonSelect>
          </IonItem> */}

          <IonListHeader>
            <IonLabel>모집 마감시간</IonLabel>
          </IonListHeader>
          <IonItem>
            <IonSelect interface="popover" placeholder="마감시간">
              <IonSelectOption value="apples">Apples</IonSelectOption>
              <IonSelectOption value="apples">Apples</IonSelectOption>
              <IonSelectOption value="oranges">Oranges</IonSelectOption>
              <IonSelectOption value="bananas">Bananas</IonSelectOption>
            </IonSelect>
          </IonItem>
        </div>
        <IonItem>
          <div className={css.makeBtn}>
            <IonButton>방만들기</IonButton>
          </div>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default MakeGroup;
