import { IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { cartOutline } from "ionicons/icons";

export default function FloatButton() {
  return (
    <IonFab vertical="bottom" horizontal="end" slot="fixed">
      <IonFabButton>
        <IonIcon icon={cartOutline} />
      </IonFabButton>
    </IonFab>
  );
}
