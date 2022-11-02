import { IonFab, IonFabButton, IonIcon, IonFabList } from "@ionic/react";

import { addOutline, chatbubblesOutline, cartOutline } from "ionicons/icons";
import css from "./FloatCartButton.module.css";

export default function FloatChatButton() {
  return (
    <div className={css.cartPosition}>
      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton>
          <IonIcon icon={addOutline} />
        </IonFabButton>
        <IonFabList side="top">
          <IonFabButton color="dark">
            <IonIcon icon={cartOutline} />
          </IonFabButton>
          <IonFabButton color="dark">
            <IonIcon icon={chatbubblesOutline} />
          </IonFabButton>
        </IonFabList>
      </IonFab>
    </div>
  );
}
