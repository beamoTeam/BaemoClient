import { IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { cartOutline } from "ionicons/icons";
import { useCartState } from "../../lib/recoil/cartState";
import css from "./FloatCartButton.module.css";
import { Link } from "react-router-dom";

export default function FloatCartButton() {
  const [cart] = useCartState();

  return cart && cart.length > 0 ? (
    <Link to="/cart">
      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton>
          <IonIcon icon={cartOutline} />
          <div className={css.counter}>{cart.length}</div>
        </IonFabButton>
      </IonFab>
    </Link>
  ) : null;
}
