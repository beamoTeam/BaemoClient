import {
  IonList,
  IonItem,
  IonCheckbox,
  IonLabel,
  IonNote,
  IonBadge,
  IonContent,
  IonListHeader,
  IonImg,
  IonIcon,
} from "@ionic/react";
import { happyOutline } from "ionicons/icons";
import css from "./Banner.module.css";

export default function Banner() {
  return (
    <IonContent>
      <IonListHeader>
        <IonLabel>주문 임박</IonLabel>
      </IonListHeader>
      <IonList>
        <IonItem className={css.itemWrap}>
          <IonImg alt="menu-image" />
          <div>BBQ치킨</div>
          <div>마감 19:00</div>
          <div>
            <IonIcon icon={happyOutline}></IonIcon>
            <IonIcon icon={happyOutline}></IonIcon>
            <IonIcon icon={happyOutline}></IonIcon>
            <IonIcon icon={happyOutline}></IonIcon>
          </div>
        </IonItem>
      </IonList>
    </IonContent>
  );
}
