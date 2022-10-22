import { IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { cartOutline } from "ionicons/icons";
import css from "./FloatCartButton.module.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useLoginState } from "../../lib/recoil/loginState";
import { useCartState } from "../../lib/recoil/cartState";

const unVisibleUrl: any = {
  cart: true,
  chatting: true,
};

export default function FloatCartButton() {
  const location = useLocation();
  const [cart] = useCartState();
  const [isLogin] = useLoginState();

  if (!isLogin) return null;
  if (!!unVisibleUrl[location.pathname.split("/")[1]]) {
    return null;
  }

  return cart > 0 ? (
    <Link to="/cart">
      <div className={css.cartPosition}>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton>
            <IonIcon icon={cartOutline} />
            <div className={css.counter}>{cart}</div>
          </IonFabButton>
        </IonFab>
      </div>
    </Link>
  ) : null;
}
