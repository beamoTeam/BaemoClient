import { IonFab, IonFabButton, IonIcon, IonFabList } from "@ionic/react";

import { chatbubblesOutline, cartOutline } from "ionicons/icons";
import css from "./FloatCartButton.module.css";

export default function FloatChatButton() {
  // return (
  //   <div onClick={() => console.log("채팅 버튼 클릭")}>
  //     <div className={css.cartPosition}>
  //       <IonFab vertical="bottom" horizontal="start" slot="fixed">
  //         <IonFabButton>
  //           <IonIcon icon={cartOutline} />
  //           <div className={css.counter}>{}</div>
  //         </IonFabButton>
  //       </IonFab>
  //     </div>
  //   </div>
  // );
  return (
    <IonFab vertical="center" horizontal="center" slot="fixed">
      <IonFabButton>
        <IonIcon icon={chatbubblesOutline} />
      </IonFabButton>
      <IonFabList side="bottom">
        <IonFabButton>
          <IonIcon icon={cartOutline} />
        </IonFabButton>
      </IonFabList>
    </IonFab>
  );
}
