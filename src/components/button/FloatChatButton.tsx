import { useCallback } from "react";
import { IonFab, IonFabButton, IonIcon, IonFabList } from "@ionic/react";
import { addOutline, chatbubblesOutline, cartOutline } from "ionicons/icons";
import { useHistory } from "react-router";
import css from "./FloatCartButton.module.css";

interface FloatChatButtonProps {
  chat_seq: number;
}

export default function FloatChatButton({ chat_seq }: FloatChatButtonProps) {
  const history = useHistory();

  return (
    <div className={css.cartPosition}>
      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton>
          <IonIcon icon={addOutline} />
        </IonFabButton>
        <IonFabList side="top">
          <IonFabButton
            color="dark"
            onClick={() => history.push(`/cart/${chat_seq}`)}
          >
            <IonIcon icon={cartOutline} />
          </IonFabButton>
          <IonFabButton
            color="dark"
            onClick={() => history.push(`/chatting/${chat_seq}`)}
          >
            <IonIcon icon={chatbubblesOutline} />
          </IonFabButton>
        </IonFabList>
      </IonFab>
    </div>
  );
}
