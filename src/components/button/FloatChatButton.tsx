import { IonFab, IonFabButton, IonIcon, IonFabList } from "@ionic/react";

import { addOutline, chatbubblesOutline, cartOutline } from "ionicons/icons";
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
    <div className={css.chatPosition}>
      <IonFab vertical="bottom" horizontal="start" edge slot="fixed">
        <IonFabButton>
          <IonIcon icon={addOutline} />
        </IonFabButton>
        <IonFabList side="top">
          <IonFabButton>
            <IonIcon icon={cartOutline} />
          </IonFabButton>
        </IonFabList>
        <IonFabList side="top">
          <IonFabButton>
            <IonIcon icon={chatbubblesOutline} />
          </IonFabButton>
        </IonFabList>
      </IonFab>
    </div>
  );
}
